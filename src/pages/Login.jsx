import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../config/constants'
import './AuthForms.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the redirect path from location state or default to home
  const from = location.state?.from || ROUTES.HOME

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setLoading(true)
      const success = await login(formData)
      
      if (success) {
        // Redirect to the page they were trying to access or home
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({
        form: error.message || 'Login failed. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to your account to find matching jobs
            </p>
          </div>
          
          {errors.form && (
            <div className="auth-error-message">
              {errors.form}
            </div>
          )}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'input-error' : ''}
                />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'input-error' : ''}
                />
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            <div className="form-group remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <FiLogIn />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to={ROUTES.SIGNUP} className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="auth-image-container"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="People working in office" 
            className="auth-image"
          />
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <h2>Find Your Dream Job</h2>
              <p>
                Upload your resume and let our AI match you with the perfect job opportunities
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login