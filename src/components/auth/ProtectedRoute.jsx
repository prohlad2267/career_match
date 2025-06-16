import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../config/constants'
import Loader from '../common/Loader'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader fullPage />
  }

  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProtectedRoute