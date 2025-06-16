import { jwtDecode } from 'jwt-decode'

export const isTokenValid = (token) => {
  if (!token) return false
  
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

export const decodeToken = (token) => {
  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Token decode error:', error)
    return null
  }
}

export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token)
    return {
      id: decoded.sub || decoded.id,
      email: decoded.email,
      name: decoded.name
    }
  } catch (error) {
    console.error('Get user from token error:', error)
    return null
  }
}

export const formatAuthError = (error) => {
  if (error.response && error.response.data) {
    const { data } = error.response
    
    if (typeof data === 'string') {
      return data
    }
    
    if (data.message) {
      return data.message
    }
    
    if (data.detail) {
      return data.detail
    }
    
    if (typeof data === 'object') {
      const errorMessage = Object.values(data).flat().join(', ')
      return errorMessage
    }
  }
  
  return 'Authentication failed. Please try again.'
}