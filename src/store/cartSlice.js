import { createSlice } from '@reduxjs/toolkit'

const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart:', error)
  }
}

const calculateTotals = (items) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

const initialItems = getCartFromStorage()
const initialTotals = calculateTotals(initialItems)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialItems,
    total: initialTotals.total,
    itemCount: initialTotals.itemCount,
    isOpen: false
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        } else {
          item.quantity = quantity
        }
      }

      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
      saveCartToStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      saveCartToStorage([])
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions
export default cartSlice.reducer