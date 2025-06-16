import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, FiBookmark, FiExternalLink, FiBriefcase, 
  FiMapPin, FiCalendar, FiDollarSign, FiClock 
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import { saveJob } from '../api/resumeApi'
import Loader from '../components/common/Loader'
import './JobDetails.css'

// Placeholder function to get job details - replace with actual API call
const getJobDetails = async (id) => {
  // This is a mock function - in production, you would call your API
  // Example: return await api.get(`/resume/job/${id}`)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return mock data
  return {
    id,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    company_logo: 'https://images.pexels.com/photos/5723176/pexels-photo-5723176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Remote, United States',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    posted_date: '2023-05-15',
    description: `
      <p>We are looking for an experienced Frontend Developer to join our growing team. As a Senior Frontend Developer, you will be responsible for building user interfaces for our products using modern JavaScript frameworks.</p>
      
      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop and maintain responsive user interfaces using React.js</li>
        <li>Collaborate with designers to implement UI/UX designs</li>
        <li>Write clean, efficient, and reusable code</li>
        <li>Optimize applications for maximum performance</li>
        <li>Troubleshoot and debug issues</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>5+ years of experience in frontend development</li>
        <li>Strong proficiency in JavaScript, HTML, and CSS</li>
        <li>Experience with React.js and modern frontend frameworks</li>
        <li>Knowledge of responsive design principles</li>
        <li>Familiarity with RESTful APIs and asynchronous request handling</li>
        <li>Experience with state management (Redux, Context API)</li>
        <li>Basic understanding of server-side rendering</li>
        <li>Excellent problem-solving skills</li>
      </ul>
      
      <h3>Benefits:</h3>
      <ul>
        <li>Competitive salary and equity package</li>
        <li>Health, dental, and vision insurance</li>
        <li>Flexible working hours and remote work options</li>
        <li>Professional development budget</li>
        <li>401(k) with company match</li>
      </ul>
    `,
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Redux', 'TypeScript', 'Responsive Design'],
    match_percentage: 92,
    url: 'https://example.com/job/123'
  }
}

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        const data = await getJobDetails(id)
        setJob(data)
      } catch (error) {
        console.error('Failed to fetch job details:', error)
        toast.error('Failed to load job details. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobDetails()
  }, [id])
  
  // Handle navigation back
  const handleGoBack = () => {
    navigate(-1)
  }
  
  // Handle save job
  const handleSaveJob = async () => {
    if (saving || saved) return
    
    try {
      setSaving(true)
      await saveJob(job.id)
      setSaved(true)
      toast.success('Job saved successfully!')
    } catch (error) {
      console.error('Error saving job:', error)
      toast.error('Failed to save job. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  
  // Handle apply to job
  const handleApply = () => {
    if (job?.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer')
    }
  }
  
  if (loading) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="job-details-loading">
            <Loader size="large" />
          </div>
        </div>
      </div>
    )
  }
  
  if (!job) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="job-not-found">
            <h2>Job Not Found</h2>
            <p>The job you're looking for doesn't exist or has been removed.</p>
            <button className="button" onClick={handleGoBack}>
              <FiArrowLeft />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="job-details-page">
      <div className="container">
        <motion.div 
          className="job-details-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="job-details-header">
            <button 
              className="back-button"
              onClick={handleGoBack}
              aria-label="Go back"
            >
              <FiArrowLeft />
              <span>Back</span>
            </button>
            
            <button 
              className={`save-button ${saved ? 'saved' : ''}`}
              onClick={handleSaveJob}
              disabled={saving || saved}
              aria-label={saved ? 'Job saved' : 'Save job'}
            >
              <FiBookmark />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          
          <div className="job-header">
            <div className="job-company-logo">
              {job.company_logo ? (
                <img src={job.company_logo} alt={`${job.company} logo`} />
              ) : (
                <div className="job-company-initial">
                  {job.company.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="job-title-container">
              <h1 className="job-title">{job.title}</h1>
              <div className="job-company-name">{job.company}</div>
              
              {job.match_percentage && (
                <div className="job-match">
                  <div className="match-label">Match</div>
                  <div className="match-percentage">{job.match_percentage}%</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="job-meta">
            <div className="meta-item">
              <FiMapPin className="meta-icon" />
              <span>{job.location}</span>
            </div>
            
            {job.type && (
              <div className="meta-item">
                <FiBriefcase className="meta-icon" />
                <span>{job.type}</span>
              </div>
            )}
            
            {job.salary && (
              <div className="meta-item">
                <FiDollarSign className="meta-icon" />
                <span>{job.salary}</span>
              </div>
            )}
            
            {job.posted_date && (
              <div className="meta-item">
                <FiCalendar className="meta-icon" />
                <span>Posted {formatDate(job.posted_date)}</span>
              </div>
            )}
          </div>
          
          {job.skills?.length > 0 && (
            <div className="job-skills">
              <h3>Required Skills</h3>
              <div className="skills-list">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="job-description">
            <h3>Job Description</h3>
            <div 
              className="description-content"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
          
          <div className="job-actions">
            <button 
              className="apply-button"
              onClick={handleApply}
            >
              <FiExternalLink />
              <span>Apply Now</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}

export default JobDetails