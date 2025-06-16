import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiLogOut, FiBookmark } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../config/constants'
import './Header.css'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <Link to={ROUTES.HOME} className="logo">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="logo-text">Career<span className="logo-accent">Match</span></span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <NavLink 
                to={ROUTES.HOME} 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated() && (
              <>
                <li>
                  <NavLink 
                    to={ROUTES.JOB_MATCHES} 
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to={ROUTES.SAVED_JOBS} 
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    Saved Jobs
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Authentication Actions */}
        <div className="auth-actions">
          {isAuthenticated() ? (
            <div className="user-menu">
              <NavLink to={ROUTES.PROFILE} className="user-profile">
                <FiUser />
                <span>Welcome, {user?.name || 'User'}</span>
              </NavLink>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to={ROUTES.LOGIN} className="button button-secondary">Login</Link>
              <Link to={ROUTES.SIGNUP} className="button">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className="mobile-nav-links">
          <li>
            <NavLink to={ROUTES.HOME} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          {isAuthenticated() ? (
            <>
              <li>
                <NavLink to={ROUTES.PROFILE} onClick={() => setIsMenuOpen(false)}>
                  <FiUser />
                  <span>Welcome, {user?.name || 'User'}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.JOB_MATCHES} onClick={() => setIsMenuOpen(false)}>
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.SAVED_JOBS} onClick={() => setIsMenuOpen(false)}>
                  <FiBookmark />
                  <span>Saved Jobs</span>
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.SIGNUP} onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </motion.div>
    </header>
  )
}

export default Header