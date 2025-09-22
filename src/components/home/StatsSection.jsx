import React from 'react'
import { Users, ShoppingBag, Truck, Clock } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    { icon: <Users className="h-6 w-6" />, number: '50,000+', label: 'Happy Customers' },
    { icon: <ShoppingBag className="h-6 w-6" />, number: '10,000+', label: 'Products' },
    { icon: <Truck className="h-6 w-6" />, number: '99.9%', label: 'Delivery Success' },
    { icon: <Clock className="h-6 w-6" />, number: '24/7', label: 'Customer Support' }
  ]

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="card p-6 hover:shadow-lg">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600">
              {stat.icon}
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.number}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  )
}

export default StatsSection