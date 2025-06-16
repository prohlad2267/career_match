import PropTypes from 'prop-types'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Pagination.css'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  pageSize = 5,
  totalItems,
  siblingsCount = 1,
}) => {
  // Generate page numbers to display
  const generatePageNumbers = () => {
    const totalNumbers = siblingsCount * 2 + 3 // siblings on both sides + first + current + last
    const totalButtons = Math.min(totalNumbers, totalPages)
    
    if (totalPages <= totalButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages)
    
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1
    
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingsCount
      return Array.from({ length: leftItemCount }, (_, i) => i + 1).concat('...')
    }
    
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingsCount
      return ['...'].concat(
        Array.from(
          { length: rightItemCount }, 
          (_, i) => totalPages - rightItemCount + i + 1
        )
      )
    }
    
    if (shouldShowLeftDots && shouldShowRightDots) {
      return [1, '...']
        .concat(
          Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 }, 
            (_, i) => leftSiblingIndex + i
          )
        )
        .concat(['...', totalPages])
    }
  }
  
  const pageNumbers = generatePageNumbers()
  
  const getPaginationInfo = () => {
    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)
    return `${startItem}-${endItem} of ${totalItems}`
  }
  
  return (
    <div className="pagination-container">
      {totalItems > 0 && (
        <div className="pagination-info">
          {getPaginationInfo()}
        </div>
      )}
      
      <div className="pagination">
        <button 
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>
        
        {pageNumbers?.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  siblingsCount: PropTypes.number
}

export default Pagination