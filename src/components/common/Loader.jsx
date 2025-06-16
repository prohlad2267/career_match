import './Loader.css'

const Loader = ({ size = 'medium', fullPage = false }) => {
  const sizeClasses = {
    small: 'loader-sm',
    medium: 'loader-md',
    large: 'loader-lg'
  }

  return (
    <div className={`loader-container ${fullPage ? 'loader-fullpage' : ''}`}>
      <div className={`loader ${sizeClasses[size]}`}>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
    </div>
  )
}

export default Loader