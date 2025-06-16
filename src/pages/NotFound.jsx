import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiSearch } from 'react-icons/fi'
import { ROUTES } from '../config/constants'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div 
          className="not-found-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-message">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="not-found-actions">
            <Link to={ROUTES.HOME} className="button">
              <FiHome />
              <span>Back to Home</span>
            </Link>
            <Link to={ROUTES.JOB_MATCHES} className="button button-secondary">
              <FiSearch />
              <span>Browse Jobs</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound