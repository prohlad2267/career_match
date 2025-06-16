import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBookmark, FiFileText } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { getSavedJobs } from '../api/resumeApi'
import JobCard from '../components/jobs/JobCard'
import Loader from '../components/common/Loader'
import { ROUTES } from '../config/constants'
import './SavedJobs.css'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true)
        const response = await getSavedJobs()
        setSavedJobs(response.jobs || [])
      } catch (error) {
        console.error('Failed to fetch saved jobs:', error)
        toast.error('Failed to load saved jobs. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchSavedJobs()
  }, [])
  
  return (
    <div className="saved-jobs-page">
      <div className="container">
        <motion.div 
          className="saved-jobs-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Saved Jobs</h1>
          <p className="page-description">
            Review and apply to jobs you've saved for later
          </p>
        </motion.div>
        
        <div className="saved-jobs-container">
          {loading ? (
            <div className="saved-jobs-loading">
              <Loader size="large" />
            </div>
          ) : savedJobs.length > 0 ? (
            <motion.div 
              className="saved-jobs-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {savedJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  isSaved={true}
                />
              ))}
            </motion.div>
          ) : (
            <div className="no-saved-jobs">
              <div className="empty-icon">
                <FiBookmark size={48} />
              </div>
              <h3>No Saved Jobs Yet</h3>
              <p>
                You haven't saved any jobs yet. Browse job matches and save the ones 
                you're interested in to apply later.
              </p>
              <div className="no-saved-jobs-actions">
                <Link to={ROUTES.JOB_MATCHES} className="button">
                  Browse Jobs
                </Link>
                <Link to={ROUTES.UPLOAD_RESUME} className="button button-secondary">
                  <FiFileText />
                  <span>Update Resume</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SavedJobs