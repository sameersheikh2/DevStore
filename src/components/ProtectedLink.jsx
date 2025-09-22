import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedLink = ({ children, className = '', protectedAction = 'access this feature' }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error(`Please log in to ${protectedAction}`)
      navigate('/login')
      window.scrollTo(0, 0)
    } else {
      toast.info('Feature coming soon!')
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

export default ProtectedLink