import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { getMatchingJobs } from '../api/resumeApi'
import JobCard from '../components/jobs/JobCard'
import Pagination from '../components/jobs/Pagination'
import Loader from '../components/common/Loader'
import './JobMatches.css'

const JobMatches = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  const [pageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState('relevance')
  const [filters, setFilters] = useState({
    jobType: 'all',
    experience: 'all',
    location: 'all'
  })

  // Fetch matching jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await getMatchingJobs(currentPage, pageSize)
        
        setJobs(response.jobs || [])
        setTotalPages(response.total_pages || 1)
        setTotalJobs(response.total_jobs || 0)
      } catch (error) {
        console.error('Failed to fetch matching jobs:', error)
        toast.error('Failed to load job matches. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [currentPage, pageSize])

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Logic for searching jobs
    toast.info('Search functionality will be implemented in the next update')
  }

  // Toggle filters panel
  const toggleFilters = () => {
    setFilterOpen(!filterOpen)
  }

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    })
  }

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  // Handle job save
  const handleJobSave = (jobId) => {
    // This will be called from the JobCard component when a job is saved
    console.log('Job saved:', jobId)
  }

  return (
    <div className="job-matches-page">
      <div className="container">
        <motion.div 
          className="job-matches-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Matching Jobs</h1>
          <p className="page-description">
            Jobs that match your skills and experience
          </p>
          
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
            
            <button 
              type="button" 
              className="filter-toggle-button"
              onClick={toggleFilters}
            >
              <FiFilter />
              <span>Filters</span>
              <FiChevronDown className={`chevron-icon ${filterOpen ? 'open' : ''}`} />
            </button>
          </form>
          
          {filterOpen && (
            <motion.div 
              className="filters-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="filters-container">
                <div className="filter-group">
                  <label>Job Type</label>
                  <select 
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Experience</label>
                  <select 
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Location</label>
                  <select 
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option value="all">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Sort By</label>
                  <select 
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="recent">Most Recent</option>
                    <option value="salary-high">Salary (High to Low)</option>
                    <option value="salary-low">Salary (Low to High)</option>
                  </select>
                </div>
              </div>
              
              <div className="filter-actions">
                <button className="clear-filters-button">
                  Clear Filters
                </button>
                <button className="apply-filters-button">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
          
          <div className="jobs-stats">
            <p>
              {loading ? (
                'Loading jobs...'
              ) : totalJobs > 0 ? (
                `Found ${totalJobs} matching job${totalJobs !== 1 ? 's' : ''}`
              ) : (
                'No matching jobs found'
              )}
            </p>
          </div>
        </motion.div>
        
        <div className="jobs-container">
          {loading ? (
            <div className="jobs-loading">
              <Loader size="large" />
            </div>
          ) : jobs.length > 0 ? (
            <>
              <div className="jobs-grid">
                {jobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    onSave={handleJobSave}
                  />
                ))}
              </div>
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                totalItems={totalJobs}
              />
            </>
          ) : (
            <div className="no-jobs-message">
              <h3>No matching jobs found</h3>
              <p>
                Try adjusting your search criteria or upload an updated resume
                to find more matching opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobMatches