import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { setFilters, addCategoryFilter, removeCategoryFilter, clearAllFilters, removeFilter } from '../store/productsSlice'
import { getCategories } from '../utils/api'

const ProductFilters = ({ productCount }) => {
  const dispatch = useDispatch()
  const { filters, searchQuery } = useSelector((state) => state.products)
  const [categories, setCategories] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])

  const handleCategoryToggle = (categoryId) => {
    if (filters.categories.includes(categoryId)) {
      dispatch(removeCategoryFilter(categoryId))
    } else {
      dispatch(addCategoryFilter(categoryId))
    }
  }

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }))
  }

  const getActiveFilters = () => {
    const activeFilters = []

    if (searchQuery) {
      activeFilters.push({
        type: 'search',
        label: `Search: "${searchQuery}"`,
        value: searchQuery
      })
    }

    filters.categories.forEach(category => {
      const categoryName = categories.find(c => c.id === category)?.name || category
      activeFilters.push({
        type: 'category',
        label: categoryName,
        value: category
      })
    })

    if (filters.priceRange && filters.priceRange !== 'all') {
      const priceLabels = {
        'under-20': 'Under $20',
        '20-50': '$20 - $50', 
        '50-100': '$50 - $100',
        'over-100': 'Over $100'
      }
      activeFilters.push({
        type: 'priceRange',
        label: priceLabels[filters.priceRange],
        value: filters.priceRange
      })
    }

    if (filters.sortBy && filters.sortBy !== 'default') {
      const sortLabels = {
        'name': 'A-Z',
        'price-low': 'Price ↑',
        'price-high': 'Price ↓',
        'rating': 'Top Rated'
      }
      activeFilters.push({
        type: 'sortBy',
        label: sortLabels[filters.sortBy],
        value: filters.sortBy
      })
    }

    if (filters.inStock) {
      activeFilters.push({
        type: 'inStock',
        label: 'In Stock Only',
        value: true
      })
    }

    return activeFilters
  }

  const activeFilters = getActiveFilters()
  const hasActiveFilters = activeFilters.length > 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
            All Products
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {productCount} product{productCount !== 1 ? 's' : ''} found
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => dispatch(clearAllFilters())}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {hasActiveFilters && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={`${filter.type}-${filter.value}-${index}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-200 dark:border-primary-700"
              >
                {filter.label}
                <button
                  onClick={() => dispatch(removeFilter({ filterType: filter.type, value: filter.value }))}
                  className="ml-2 hover:text-primary-600 dark:hover:text-primary-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={`transition-all duration-300 overflow-hidden ${
        isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categories
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {categories.map(category => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                    filters.categories.includes(category.id)
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {filters.categories.includes(category.id) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="all">All Prices</option>
              <option value="under-20">Under $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="default">Default</option>
              <option value="name">A to Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Availability
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                filters.inStock
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {filters.inStock && <Check className="h-3 w-3" />}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                In Stock Only
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters