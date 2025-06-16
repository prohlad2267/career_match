import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { loginUser, registerUser, getCurrentUser } from '../api/authApi'

// Mock the API modules
vi.mock('../api/authApi', () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
  getCurrentUser: vi.fn(),
  validateToken: vi.fn(),
}))

// Simple test component
const TestComponent = () => {
  const { isAuthenticated, user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated() ? 'Authenticated' : 'Not Authenticated'}
      </div>
      {user && <div data-testid="user-name">{user.name}</div>}
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    
    // Mock getCurrentUser to resolve with null by default
    getCurrentUser.mockResolvedValue(null)
  })
  
  it('should render not authenticated when no user', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated')
  })
  
  it('should register a new user successfully', async () => {
    registerUser.mockResolvedValue({ message: 'User registered successfully' })
    
    let authContext
    
    const AuthConsumer = () => {
      authContext = useAuth()
      return null
    }
    
    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthConsumer />
        </AuthProvider>
      </BrowserRouter>
    )
    
    // Wait for initialization to complete
    await waitFor(() => expect(authContext.loading).toBe(false))
    
    // Attempt register
    await act(async () => {
      const userData = { 
        name: 'New User', 
        email: 'new@example.com', 
        password: 'password' 
      }
      
      const success = await authContext.register(userData)
      expect(success).toBe(true)
    })
    
    // Verify registerUser was called with correct data
    expect(registerUser).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New User',
      email: 'new@example.com',
      password: 'password'
    }))
  })

  it('should handle authentication state correctly', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' }
    
    // Mock successful login
    loginUser.mockResolvedValue({ 
      token: 'valid-jwt-token', 
      user: mockUser 
    })
    
    let authContext
    
    const AuthConsumer = () => {
      authContext = useAuth()
      return null
    }
    
    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthConsumer />
        </AuthProvider>
      </BrowserRouter>
    )
    
    // Wait for initialization
    await waitFor(() => expect(authContext.loading).toBe(false))
    
    // Should start unauthenticated
    expect(authContext.isAuthenticated()).toBe(false)
    
    // Perform login
    await act(async () => {
      const success = await authContext.login({ 
        email: 'test@example.com', 
        password: 'password' 
      })
      expect(success).toBe(true)
    })
    
    // Should now be authenticated
    expect(authContext.user).toEqual(mockUser)
  })
})