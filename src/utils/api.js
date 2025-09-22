import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com'

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

const transformProduct = (product) => {
  return {
    id: product.id.toString(),
    name: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    rating: product.rating?.rate || 4.0,
    reviewCount: product.rating?.count || 0,
    stock: Math.floor(Math.random() * 50) + 10
  }
}

export const getProducts = async (filters = {}) => {
  try {
    const response = await apiClient.get('/products')
    let products = response.data.map(transformProduct)

    if (filters.searchQuery) {
      const searchTerm = filters.searchQuery.toLowerCase()
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.categories && filters.categories.length > 0) {
      products = products.filter(product => 
        filters.categories.includes(product.category)
      )
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under-20':
          products = products.filter(p => p.price < 20)
          break
        case '20-50':
          products = products.filter(p => p.price >= 20 && p.price <= 50)
          break
        case '50-100':
          products = products.filter(p => p.price > 50 && p.price <= 100)
          break
        case 'over-100':
          products = products.filter(p => p.price > 100)
          break
      }
    }

    if (filters.inStock) {
      products = products.filter(p => p.stock > 0)
    }

    switch (filters.sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        products.sort((a, b) => a.id - b.id)
    }

    return { products }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to load products')
  }
}

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`)
    return transformProduct(response.data)
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Product not found')
  }
}

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/products/categories')
    return response.data.map(cat => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}