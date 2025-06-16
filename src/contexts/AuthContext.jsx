import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser, registerUser, getCurrentUser, validateToken } from '../api/authApi'
import { TOKEN_KEY, USER_KEY, ROUTES } from '../config/constants'
import { isTokenValid } from '../utils/authUtils'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY)
        
        if (storedToken && isTokenValid(storedToken)) {
          setToken(storedToken)
          
          // Try to get user from localStorage first
          const storedUser = JSON.parse(localStorage.getItem(USER_KEY))
          
          if (storedUser) {
            setUser(storedUser)
          } else {
            // If no user in localStorage, fetch from API
            const userData = await getCurrentUser()
            setUser(userData)
            localStorage.setItem(USER_KEY, JSON.stringify(userData))
          }

          // Validate token with backend
          await validateToken()
        } else {
          // Clear invalid token and user data
          logout()
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const data = await loginUser(credentials)
      
      const { token: newToken, user: userData } = data
      
      setToken(newToken)
      setUser(userData)
      
      localStorage.setItem(TOKEN_KEY, newToken)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      
      toast.success('Login successful!')
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      await registerUser(userData)
      toast.success('Account created successfully!')
      navigate(ROUTES.LOGIN)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    navigate(ROUTES.HOME)
  }

  const updateUserProfile = (newUserData) => {
    const updatedUser = { ...user, ...newUserData }
    setUser(updatedUser)
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
  }

  const isAuthenticated = () => {
    return !!token && !!user && isTokenValid(token)
  }

  const getUserRole = () => {
    return user?.role || 'user'
  }

  const contextValue = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    getUserRole,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext