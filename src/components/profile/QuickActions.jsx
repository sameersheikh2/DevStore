import React from 'react'
import { ArrowRight } from 'lucide-react'

const QuickActions = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          className="card p-6 text-left hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600">
                {action.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.desc}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">
                {action.count}
              </span>
              {action.showArrow && (
                <ArrowRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default QuickActions