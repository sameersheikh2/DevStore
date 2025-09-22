import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingBag, ArrowLeft, Tag, Shield } from 'lucide-react'
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'
import { formatCurrency } from '../utils/api'
import { PrimaryButton, SecondaryButton } from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { CartPageItem } from '../components/CartItem'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, itemCount } = useSelector((state) => state.cart)

  const handleNavigation = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const subtotal = total
  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12 text-gray-400" />}
          title="Your cart is empty"
          message="Looks like you haven't added any items to your cart yet. Start shopping to fill it up with amazing products!"
          actionButton={
            <>
              <PrimaryButton onClick={() => handleNavigation('/products')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </PrimaryButton>
              <SecondaryButton onClick={() => handleNavigation('/')}>
                Back to Home
              </SecondaryButton>
            </>
          }
        />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleNavigation('/products')}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Items in Cart</h2>
              <button
                onClick={handleClearCart}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                Clear all items
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartPageItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal ({itemCount} items)</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                </span>
              </div>

              {shipping > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Add {formatCurrency(50 - total)} more for free shipping
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-gray-900 dark:text-white text-xl">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <PrimaryButton className="w-full text-lg py-3">
                Proceed to Checkout
              </PrimaryButton>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart