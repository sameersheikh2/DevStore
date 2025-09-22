import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { X, ShoppingBag, Package } from 'lucide-react'
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'
import { formatCurrency } from '../utils/api'
import { PrimaryButton, SecondaryButton } from './ui/Button'
import EmptyState from './ui/EmptyState'
import { CartSidebarItem } from './CartItem'

const CartSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, itemCount, isOpen } = useSelector((state) => state.cart)

  const handleClose = () => {
    dispatch(toggleCart())
  }

  const handleNavigation = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
    handleClose()
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

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      />

      <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col">

        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-primary-600" />
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                Discover amazing products and add them to your cart
              </p>
              <PrimaryButton onClick={() => handleNavigation('/products')}>
                Start Shopping
              </PrimaryButton>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <CartSidebarItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4 flex-shrink-0">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              Clear all items
            </button>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                <span className="font-medium text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <SecondaryButton 
                onClick={() => handleNavigation('/cart')}
                className="w-full"
              >
                View Full Cart
              </SecondaryButton>

              <PrimaryButton className="w-full">
                Proceed to Checkout
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar