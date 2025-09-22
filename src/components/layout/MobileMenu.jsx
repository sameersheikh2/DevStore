import React from 'react'
import { Search, Heart } from 'lucide-react'

const MobileMenu = ({ 
  isOpen, 
  searchQuery, 
  onSearchChange, 
  onSearch, 
  onNavigation, 
  isActivePage, 
  isAuthenticated, 
  wishlistCount = 0 
}) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="space-y-4">

        <form onSubmit={onSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 pl-10 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </form>

        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => onNavigation('/')}
            className={`text-left px-3 py-2 rounded-lg text-base ${
              isActivePage('/') 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigation('/products')}
            className={`text-left px-3 py-2 rounded-lg text-base ${
              isActivePage('/products') 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Products
          </button>

          {isAuthenticated && (
            <button
              onClick={() => onNavigation('/wishlist')}
              className={`text-left px-3 py-2 rounded-lg text-base flex items-center justify-between ${
                isActivePage('/wishlist') 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>My Wishlist</span>
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-1">
                {wishlistCount}
              </span>
            </button>
          )}
        </nav>

        {!isAuthenticated && (
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onNavigation('/login')}
              className="text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
            >
              Login
            </button>
            <button
              onClick={() => onNavigation('/signup')}
              className="text-left px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-base"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileMenu