import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FiBookmark, FiExternalLink, FiInfo } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { saveJob } from '../../api/resumeApi'
import './JobCard.css'

const JobCard = ({ job, isSaved = false, onSave }) => {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(isSaved)

  const handleSaveJob = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (saving) return
    
    try {
      setSaving(true)
      await saveJob(job.id)
      setSaved(true)
      toast.success('Job saved successfully!')
      
      // Call parent component's callback if provided
      if (onSave) {
        onSave(job.id)
      }
    } catch (error) {
      console.error('Error saving job:', error)
      toast.error('Failed to save job. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div 
      className="job-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="job-card-header">
        <div className="job-company-logo">
          {job.company_logo ? (
            <img src={job.company_logo} alt={`${job.company} logo`} />
          ) : (
            <div className="job-company-initial">
              {job.company.charAt(0)}
            </div>
          )}
        </div>
        
        <button 
          className={`save-job-button ${saved ? 'saved' : ''}`}
          onClick={handleSaveJob}
          disabled={saving || saved}
          aria-label={saved ? 'Job saved' : 'Save job'}
        >
          <FiBookmark />
        </button>
      </div>
      
      <div className="job-card-content">
        <h3 className="job-title">{job.title}</h3>
        <div className="job-company">{job.company}</div>
        
        <div className="job-location-type">
          <span className="job-location">{job.location}</span>
          {job.type && <span className="job-type">{job.type}</span>}
        </div>
        
        <div className="job-skills">
          {job.skills && job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="job-skill-tag">
              {skill}
            </span>
          ))}
        </div>
        
        <p className="job-description">
          {job.description ? (
            job.description.length > 100 
              ? `${job.description.substring(0, 100)}...` 
              : job.description
          ) : 'No description available'}
        </p>
      </div>
      
      <div className="job-card-actions">
        <Link 
          to={`/job/${job.id}`}
          className="job-button job-details-button"
        >
          <FiInfo />
          <span>Details</span>
        </Link>
        
        <a 
          href={job.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="job-button job-apply-button"
        >
          <FiExternalLink />
          <span>Apply</span>
        </a>
      </div>
    </motion.div>
  )
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    company_logo: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    posted_date: PropTypes.string
  }).isRequired,
  isSaved: PropTypes.bool,
  onSave: PropTypes.func
}

export default JobCard