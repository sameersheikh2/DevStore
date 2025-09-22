import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setUser, clearUser, setLoading } = authSlice.actions
export default authSlice.reducer