import axios from 'axios'
import { API_URL } from '../config/constants'

// Create axios instance for resume-related endpoints
const resumeApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// Add token to requests if it exists
resumeApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Upload resume
export const uploadResume = async (formData) => {
  try {
    const response = await resumeApi.post('/resume/upload/', formData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Resume upload failed' }
  }
}

// Get matching jobs based on resume
export const getMatchingJobs = async (page = 1, size = 5) => {
  try {
    const response = await resumeApi.get(`/resume/match-jobs/?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch matching jobs' }
  }
}

// Save a job
export const saveJob = async (jobId) => {
  try {
    const response = await resumeApi.post('/resume/save-job/', { job_id: jobId })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to save job' }
  }
}

// Get saved jobs
export const getSavedJobs = async () => {
  try {
    const response = await resumeApi.get('/resume/saved-jobs/')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch saved jobs' }
  }
}

export default resumeApi