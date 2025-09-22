import React from 'react'

const EmptyState = ({ 
  icon, 
  title, 
  message, 
  actionButton,
  className = '' 
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="card p-12">
        {icon && (
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
        )}
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {message}
        </p>
        {actionButton && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState