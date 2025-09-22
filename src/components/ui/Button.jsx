import React from 'react'

export const PrimaryButton = ({ children, onClick, disabled = false, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const SecondaryButton = ({ children, onClick, disabled = false, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-secondary ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const IconButton = ({ children, onClick, disabled = false, className = '', title, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}