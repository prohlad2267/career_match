import axios from 'axios'
import { API_URL } from '../config/constants'

// Create axios instance for auth endpoints
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await authApi.post('/resume/auth/signup/', userData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' }
  }
}

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await authApi.post('/resume/auth/signin/', credentials)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' }
  }
}

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const response = await authApi.get('/resume/profile/')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user profile' }
  }
}

// Validate token
export const validateToken = async () => {
  try {
    const response = await authApi.get('/resume/auth/validate-token/')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Token validation failed' }
  }
}

export default authApi