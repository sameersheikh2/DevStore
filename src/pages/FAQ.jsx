import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null)

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index)
  }

  const faqData = [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse our products, click "Add to Cart" on items you want, then go to your cart and click "Proceed to Checkout" to complete your purchase.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay for secure payments.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Orders over $50 qualify for free shipping. Express shipping (1-2 days) is available for an additional fee.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. Contact our support team to initiate a return.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive an email with a tracking number. You can also log in to your account to view order status.'
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'Orders can be cancelled or modified within 1 hour of placing them. After that, the order enters processing and cannot be changed.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within the United States. International shipping may be available in the future.'
    },
    {
      question: 'How do I create an account?',
      answer: 'Click "Sign Up" in the top right corner, fill in your details, and verify your email address to start shopping with saved preferences.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use SSL encryption and follow industry best practices to protect your personal and payment information.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through the Contact Us page, email us at support@simplestore.com, or call (555) 123-4567.'
    },
    {
      question: 'What if I receive a damaged item?',
      answer: 'Contact us immediately with photos of the damaged item. We will provide a replacement or full refund at no cost to you.'
    },
    {
      question: 'Do you offer discounts or promotions?',
      answer: 'Yes! Sign up for our newsletter to receive exclusive discounts, early access to sales, and special promotional offers.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions about shopping, shipping, returns, and more. 
          Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="card overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                {item.question}
              </h3>
              {openItem === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${
              openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center card p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Still have questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our friendly support team is here to help you with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@simplestore.com"
            className="btn-primary inline-flex items-center justify-center"
          >
            Email Support
          </a>
          <a
            href="tel:+15551234567"
            className="btn-secondary inline-flex items-center justify-center"
          >
            Call (555) 123-4567
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ