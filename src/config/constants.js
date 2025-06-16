// API config
export const API_URL = 'http://127.0.0.1:8000/api'

// Local storage keys
export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  UPLOAD_RESUME: '/upload-resume',
  PROFILE: '/profile',
  JOB_MATCHES: '/job-matches',
  JOB_DETAILS: '/job',
  SAVED_JOBS: '/saved-jobs',
}

// Error messages
export const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong. Please try again.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UPLOAD_ERROR: 'Error uploading resume. Please try again.',
  UNAUTHORIZED: 'You need to login to access this resource',
}

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  SIGNUP: 'Account created successfully!',
  RESUME_UPLOAD: 'Resume uploaded successfully!',
  JOB_SAVED: 'Job saved successfully!',
}