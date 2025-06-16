import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFileText, FiUser, FiMail, FiCode, FiBriefcase, FiChevronRight } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import { getCurrentUser } from '../api/authApi'
import Loader from '../components/common/Loader'
import { ROUTES } from '../config/constants'
import './Profile.css'

const Profile = () => {
  const { user, updateUserProfile } = useAuth()
  const [userData, setUserData] = useState(user)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetch current user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getCurrentUser()
        setUserData(data)
        
        // Update user in AuthContext
        updateUserProfile(data)
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        toast.error('Failed to load your profile. Please try again.')
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [updateUserProfile])

  if (loading) {
    return <Loader fullPage />
  }

  const handleViewMatchingJobs = () => {
    navigate(ROUTES.JOB_MATCHES)
  }

  const handleViewSavedJobs = () => {
    navigate(ROUTES.SAVED_JOBS)
  }

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div 
          className="profile-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-header">
            <div className="profile-avatar">
              {userData?.name?.charAt(0) || <FiUser />}
            </div>
            <div className="profile-title">
              <h1>{userData?.name || 'Your Profile'}</h1>
              <p className="profile-subtitle">
                {userData?.resume_uploaded 
                  ? 'Your resume has been uploaded' 
                  : 'Upload your resume to get matched with jobs'}
              </p>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="info-card">
                <div className="info-item">
                  <FiUser className="info-icon" />
                  <div className="info-content">
                    <h3>Full Name</h3>
                    <p>{userData?.name || 'Not provided'}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FiMail className="info-icon" />
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>{userData?.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {userData?.skills?.length > 0 ? (
              <div className="profile-section">
                <h2 className="section-title">Skills</h2>
                <div className="skills-container">
                  {userData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="profile-section">
                <h2 className="section-title">Skills</h2>
                <div className="empty-state">
                  <FiCode className="empty-icon" />
                  <p>
                    {userData?.resume_uploaded 
                      ? 'No skills extracted from your resume yet' 
                      : 'Upload your resume to extract your skills'}
                  </p>
                  {!userData?.resume_uploaded && (
                    <Link to={ROUTES.UPLOAD_RESUME} className="button">
                      <FiFileText />
                      <span>Upload Resume</span>
                    </Link>
                  )}
                </div>
              </div>
            )}

            <div className="profile-section">
              <h2 className="section-title">Job Matching</h2>
              <div className="actions-container">
                <div className="action-card">
                  <div className="action-icon">
                    <FiBriefcase />
                  </div>
                  <div className="action-content">
                    <h3>Find Matching Jobs</h3>
                    <p>Discover jobs that match your skills and experience</p>
                  </div>
                  <button 
                    className="action-button"
                    onClick={handleViewMatchingJobs}
                    disabled={!userData?.resume_uploaded}
                  >
                    <FiChevronRight />
                  </button>
                </div>
                
                <div className="action-card">
                  <div className="action-icon saved">
                    <FiBriefcase />
                  </div>
                  <div className="action-content">
                    <h3>Saved Jobs</h3>
                    <p>View jobs you've saved for later</p>
                  </div>
                  <button 
                    className="action-button"
                    onClick={handleViewSavedJobs}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>

            {!userData?.resume_uploaded && (
              <div className="upload-resume-cta">
                <div className="cta-content">
                  <h3>Upload Your Resume</h3>
                  <p>Get matched with jobs that fit your skills and experience</p>
                </div>
                <Link to={ROUTES.UPLOAD_RESUME} className="button">
                  <FiFileText />
                  <span>Upload Resume</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile