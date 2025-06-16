import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { uploadResume } from '../api/resumeApi'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../config/constants'
import './ResumeUpload.css'

const ResumeUpload = () => {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const { updateUserProfile } = useAuth()
  
  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }
  
  const handleDragLeave = () => {
    setDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }
  
  // Validate file type and size
  const validateAndSetFile = (file) => {
    setError('')
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document')
      return
    }
    
    if (file.size > maxSize) {
      setError('File size should be less than 5MB')
      return
    }
    
    setFile(file)
  }
  
  // Simulate upload progress
  const simulateProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 200)
    
    return interval
  }
  
  // Handle resume upload
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }
    
    try {
      setUploading(true)
      setError('')
      
      // Start progress simulation
      const progressInterval = simulateProgress()
      
      // Create form data
      const formData = new FormData()
      formData.append('resume', file)
      
      // Upload resume
      const response = await uploadResume(formData)
      
      // Clear progress interval
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Update user profile with data from response if available
      if (response.user) {
        updateUserProfile(response.user)
      }
      
      toast.success('Resume uploaded successfully!')
      
      // Navigate to profile after a short delay
      setTimeout(() => {
        navigate(ROUTES.PROFILE)
      }, 1000)
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.message || 'Failed to upload resume. Please try again.')
      setUploadProgress(0)
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <div className="resume-upload-page">
      <div className="container">
        <motion.div 
          className="resume-upload-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Upload Your Resume</h1>
          <p className="page-description">
            Upload your resume to find jobs matching your skills and experience
          </p>
          
          {error && (
            <div className="upload-error">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}
          
          <div 
            className={`upload-area ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <div className="upload-icon">
                  <FiUpload size={40} />
                </div>
                <div className="upload-text">
                  <p>Drag & drop your resume here</p>
                  <p className="upload-subtext">or</p>
                  <label className="file-select-button">
                    <span>Browse Files</span>
                    <input 
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      hidden
                    />
                  </label>
                  <p className="file-requirements">
                    Supported formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>
              </>
            ) : (
              <div className="selected-file">
                <div className="file-icon">
                  <FiFile size={30} />
                </div>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  className="file-remove-button"
                  onClick={() => setFile(null)}
                  disabled={uploading}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          
          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {uploadProgress < 100 ? 'Uploading...' : 'Complete!'}
                {uploadProgress}%
              </div>
            </div>
          )}
          
          <div className="upload-actions">
            <button 
              className="cancel-button"
              onClick={() => navigate(ROUTES.HOME)}
              disabled={uploading}
            >
              Cancel
            </button>
            <button 
              className="upload-button"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? (
                <span className="uploading-text">
                  <span className="loading-spinner"></span>
                  Uploading...
                </span>
              ) : (
                <>
                  <FiUpload />
                  <span>Upload Resume</span>
                </>
              )}
            </button>
          </div>
          
          <div className="upload-benefits">
            <h3>Why Upload Your Resume?</h3>
            <ul className="benefits-list">
              <li>
                <FiCheckCircle />
                <span>Find jobs matching your skills and experience</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Apply to jobs with a single click</span>
              </li>
              <li>
                <FiCheckCircle />
                <span>Get personalized job recommendations</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResumeUpload