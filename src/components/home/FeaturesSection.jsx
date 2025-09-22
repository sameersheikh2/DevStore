import React from 'react'
import { ShoppingBag, Truck, Shield, Award } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary-600" />,
      title: 'Quality Products',
      description: 'Carefully selected items from trusted brands worldwide'
    },
    {
      icon: <Truck className="h-8 w-8 text-primary-600" />,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with 2-day delivery'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Secure Payment',
      description: 'SSL encrypted checkout with multiple payment options'
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: '24/7 Support',
      description: 'Expert customer service whenever you need help'
    }
  ]

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Simple Store?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're committed to providing you with the best shopping experience possible
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="card p-6 text-center hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection