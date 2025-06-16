import { Link } from 'react-router-dom'
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'
import { ROUTES } from '../../config/constants'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-sections">
          <div className="footer-section">
            <h3 className="footer-title">CareerMatch</h3>
            <p className="footer-description">
              Connecting talented professionals with their dream jobs through AI-powered resume matching.
            </p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-list-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to={ROUTES.HOME}>Home</Link></li>
              <li><Link to={ROUTES.JOB_MATCHES}>Jobs</Link></li>
              <li><Link to={ROUTES.UPLOAD_RESUME}>Upload Resume</Link></li>
              <li><Link to={ROUTES.SAVED_JOBS}>Saved Jobs</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-list-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Resume Tips</a></li>
              <li><a href="#">Interview Preparation</a></li>
              <li><a href="#">Career Advice</a></li>
              <li><a href="#">Job Search Strategies</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-list-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} CareerMatch. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer