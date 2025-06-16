import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Loader from './components/common/Loader'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'

// Lazy loaded components for better performance
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const ResumeUpload = lazy(() => import('./pages/ResumeUpload'))
const Profile = lazy(() => import('./pages/Profile'))
const JobMatches = lazy(() => import('./pages/JobMatches'))
const JobDetails = lazy(() => import('./pages/JobDetails'))
const SavedJobs = lazy(() => import('./pages/SavedJobs'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload-resume" element={
              <ProtectedRoute>
                <ResumeUpload />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/job-matches" element={
              <ProtectedRoute>
                <JobMatches />
              </ProtectedRoute>
            } />
            <Route path="/job/:id" element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            } />
            <Route path="/saved-jobs" element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App