import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import productsSlice from './productsSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice
  }
})