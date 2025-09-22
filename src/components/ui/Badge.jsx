import React from 'react'

const Badge = ({ count, className = '' }) => {
  if (count <= 0) return null

  return (
    <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${className}`}>
      {count > 9 ? '9+' : count}
    </span>
  )
}

export default Badge