import { createSlice } from '@reduxjs/toolkit'

const getWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem('wishlist')
    return wishlist ? JSON.parse(wishlist) : []
  } catch {
    return []
  }
}

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  } catch (error) {
    console.error('Error saving wishlist:', error)
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    allProducts: [],
    loading: false,
    error: null,
    searchQuery: '',
    wishlist: getWishlistFromStorage(),
    filters: {
      categories: [],
      priceRange: 'all',
      sortBy: 'default',
      inStock: false
    }
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
      state.loading = false
      state.error = null
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    clearSearch: (state) => {
      state.searchQuery = ''
      state.filters = {
        categories: [],
        priceRange: 'all',
        sortBy: 'default',
        inStock: false
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    addCategoryFilter: (state, action) => {
      const category = action.payload
      if (!state.filters.categories.includes(category)) {
        state.filters.categories.push(category)
      }
    },
    removeCategoryFilter: (state, action) => {
      const category = action.payload
      state.filters.categories = state.filters.categories.filter(c => c !== category)
    },
    clearAllFilters: (state) => {
      state.searchQuery = ''
      state.filters = {
        categories: [],
        priceRange: 'all',
        sortBy: 'default',
        inStock: false
      }
    },
    removeFilter: (state, action) => {
      const { filterType, value } = action.payload

      if (filterType === 'search') {
        state.searchQuery = ''
      } else if (filterType === 'category') {
        state.filters.categories = state.filters.categories.filter(c => c !== value)
      } else if (filterType === 'priceRange') {
        state.filters.priceRange = 'all'
      } else if (filterType === 'sortBy') {
        state.filters.sortBy = 'default'
      } else if (filterType === 'inStock') {
        state.filters.inStock = false
      }
    },
    addToWishlist: (state, action) => {
      const product = action.payload
      const exists = state.wishlist.find(item => item.id === product.id)

      if (!exists) {
        state.wishlist.push(product)
        saveWishlistToStorage(state.wishlist)
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.wishlist = state.wishlist.filter(item => item.id !== productId)
      saveWishlistToStorage(state.wishlist)
    }
  }
})

export const {
  setProducts,
  setAllProducts,
  setLoading,
  setError,
  setSearchQuery,
  clearSearch,
  setFilters,
  addCategoryFilter,
  removeCategoryFilter,
  clearAllFilters,
  removeFilter,
  addToWishlist,
  removeFromWishlist
} = productsSlice.actions

export default productsSlice.reducer