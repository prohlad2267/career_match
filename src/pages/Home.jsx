import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload, FiSearch, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../config/constants'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()

  const handleResumeUpload = () => {
    // The link will handle navigation based on auth state
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="hero-title" variants={itemVariants}>
              Find Your Perfect <span className="text-gradient">Career Match</span>
            </motion.h1>
            
            <motion.p className="hero-subtitle" variants={itemVariants}>
              Upload your resume and let AI match you with the ideal job opportunities tailored to your skills and experience
            </motion.p>
            
            <motion.div className="hero-actions" variants={itemVariants}>
              <Link 
                to={isAuthenticated() ? ROUTES.UPLOAD_RESUME : ROUTES.LOGIN}
                className="hero-button primary" 
                onClick={handleResumeUpload}
              >
                <FiUpload />
                <span>Upload Resume</span>
              </Link>
              
              <Link to={ROUTES.JOB_MATCHES} className="hero-button secondary">
                <FiSearch />
                <span>Browse Jobs</span>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Job seeker with laptop" 
              className="hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          
          <div className="steps-container">
            <motion.div 
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="step-number">1</div>
              <h3 className="step-title">Upload Your Resume</h3>
              <p className="step-description">
                Create an account and upload your resume in just a few clicks
              </p>
            </motion.div>
            
            <motion.div 
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="step-number">2</div>
              <h3 className="step-title">AI Skill Matching</h3>
              <p className="step-description">
                Our advanced algorithm identifies your skills and experience
              </p>
            </motion.div>
            
            <motion.div 
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="step-number">3</div>
              <h3 className="step-title">Get Matched Jobs</h3>
              <p className="step-description">
                Discover job opportunities that perfectly match your profile
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose CareerMatch
          </motion.h2>
          
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="feature-icon">
                <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="AI Matching" className="feature-image" />
              </div>
              <h3 className="feature-title">AI-Powered Matching</h3>
              <p className="feature-description">
                Our advanced algorithms match your skills to job requirements with high accuracy
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="feature-icon">
                <img src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Time Saving" className="feature-image" />
              </div>
              <h3 className="feature-title">Save Time</h3>
              <p className="feature-description">
                No more endless scrolling through irrelevant job postings
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="feature-icon">
                <img src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Job Applications" className="feature-image" />
              </div>
              <h3 className="feature-title">One-Click Apply</h3>
              <p className="feature-description">
                Apply to multiple jobs quickly and easily with a single click
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="feature-icon">
                <img src="https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Save Jobs" className="feature-image" />
              </div>
              <h3 className="feature-title">Save Favorite Jobs</h3>
              <p className="feature-description">
                Keep track of interesting opportunities and apply when you're ready
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="cta-title">Ready to Find Your Dream Job?</h2>
            <p className="cta-description">
              Join thousands of professionals who've found their perfect career match with our platform
            </p>
            <Link 
              to={isAuthenticated() ? ROUTES.UPLOAD_RESUME : ROUTES.SIGNUP}
              className="cta-button"
            >
              <span>Get Started Now</span>
              <FiChevronRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home