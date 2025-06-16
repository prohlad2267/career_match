import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import { AuthProvider } from '../contexts/AuthContext'

// Mock the useAuth hook to return a simple state
vi.mock('../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../contexts/AuthContext')
  return {
    ...actual,
    useAuth: () => ({
      isAuthenticated: () => false,
      user: null,
      loading: false
    })
  }
})

describe('Home Component', () => {
  it('renders the main hero section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    
    // Check if main elements are rendered
    expect(screen.getByText(/Find Your Perfect/)).toBeInTheDocument()
    expect(screen.getByText(/Career Match/)).toBeInTheDocument()
  })
  
  it('displays action buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Upload Resume')).toBeInTheDocument()
    expect(screen.getByText('Browse Jobs')).toBeInTheDocument()
  })
})