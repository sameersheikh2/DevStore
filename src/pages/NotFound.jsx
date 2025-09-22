import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl font-bold text-primary-600 dark:text-primary-400">404</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleNavigation('/')}
            className="inline-flex items-center space-x-2 btn-primary"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => handleNavigation('/products')}
            className="inline-flex items-center space-x-2 btn-secondary"
          >
            <Search className="h-4 w-4" />
            <span>Browse Products</span>
          </button>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound