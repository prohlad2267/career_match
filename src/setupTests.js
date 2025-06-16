import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock the ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock React Toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
  ToastContainer: ({ children }) => children,
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock framer-motion completely
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    button: 'button',
    form: 'form',
    input: 'input',
    span: 'span',
    a: 'a',
    section: 'section',
    img: 'img',
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock jwt-decode
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Valid for 1 hour
    sub: '123',
    email: 'test@example.com',
    name: 'Test User'
  }))
}))