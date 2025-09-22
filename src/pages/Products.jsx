import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../utils/api'
import { setProducts, setAllProducts, setLoading, setError } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'

const Products = () => {
  const dispatch = useDispatch()
  const { products, allProducts, loading, error, filters, searchQuery } = useSelector((state) => state.products)

  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const result = await getProducts({ ...filters, searchQuery })

        if (!allProducts.length) {
          const allResult = await getProducts({})
          dispatch(setAllProducts(allResult.products))
        }

        dispatch(setProducts(result.products))
      } catch (error) {
        console.error('Error loading products:', error)
        dispatch(setError('Failed to load products. Please try again.'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadProducts()
  }, [dispatch, filters, searchQuery, allProducts.length])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-12 w-12 border-2 border-gray-300 dark:border-gray-600 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="card p-8 max-w-md mx-auto">
          <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ProductFilters productCount={products.length} />

      {products.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria to find what you're looking for
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products