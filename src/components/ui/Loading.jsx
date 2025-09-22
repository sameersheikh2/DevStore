import React from 'react'

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  }

  return (
    <div className={`border-2 border-gray-300 dark:border-gray-600 border-t-primary-600 rounded-full animate-spin ${sizeClasses[size]} ${className}`}></div>
  )
}

export const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  )
}