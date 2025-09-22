import React from 'react'
import { PrimaryButton, SecondaryButton } from '../ui/Button'

const NavigationBar = ({ onNavigation, isActivePage, isAuthenticated }) => {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <button
        onClick={() => onNavigation('/')}
        className={`px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 ${
          isActivePage('/') 
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
            : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
        }`}
      >
        Home
      </button>
      <button
        onClick={() => onNavigation('/products')}
        className={`px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 ${
          isActivePage('/products') 
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
            : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
        }`}
      >
        Products
      </button>
    </nav>
  )
}

export default NavigationBar