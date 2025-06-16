import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ResumeUpload from '../pages/ResumeUpload'
import { uploadResume } from '../api/resumeApi'

// Mock the dependencies
vi.mock('../api/resumeApi', () => ({
  uploadResume: vi.fn()
}))

// Mock navigate function
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    updateUserProfile: vi.fn(),
    isAuthenticated: () => true,
    user: { name: 'Test User' },
    loading: false
  })
}))

describe('ResumeUpload Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  it('renders the resume upload form', () => {
    render(
      <BrowserRouter>
        <ResumeUpload />
      </BrowserRouter>
    )
    
    // Check if essential elements are rendered
    expect(screen.getByText('Upload Your Resume')).toBeInTheDocument()
    expect(screen.getByText('Drag & drop your resume here')).toBeInTheDocument()
    expect(screen.getByText('Browse Files')).toBeInTheDocument()
  })
  
  it('shows validation error for invalid file type', async () => {
    render(
      <BrowserRouter>
        <ResumeUpload />
      </BrowserRouter>
    )
    
    // Create a file with invalid type
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    
    // Get the hidden file input and simulate file selection
    const input = screen.getByLabelText('Browse Files')
    
    // Simulate file upload
    fireEvent.change(input, { target: { files: [file] } })
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Please upload a PDF or Word document')).toBeInTheDocument()
    })
  })
  
  it('successfully uploads a valid resume', async () => {
    // Mock successful API response
    uploadResume.mockResolvedValue({
      success: true,
      message: 'Resume uploaded successfully',
      user: {
        name: 'Test User',
        email: 'test@example.com',
        skills: ['JavaScript', 'React']
      }
    })
    
    render(
      <BrowserRouter>
        <ResumeUpload />
      </BrowserRouter>
    )
    
    // Create a valid file
    const file = new File(['test resume content'], 'resume.pdf', { type: 'application/pdf' })
    
    // Get the hidden file input and simulate file selection
    const input = screen.getByLabelText('Browse Files')
    
    // Simulate file upload
    fireEvent.change(input, { target: { files: [file] } })
    
    // Check if file name is displayed
    expect(screen.getByText('resume.pdf')).toBeInTheDocument()
    
    // Click upload button
    const uploadButton = screen.getByText('Upload Resume')
    fireEvent.click(uploadButton)
    
    // Verify API call
    await waitFor(() => {
      expect(uploadResume).toHaveBeenCalled()
    })
  })
})