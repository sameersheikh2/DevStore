import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight } from 'lucide-react'
import { getProducts } from '../utils/api'
import { setProducts, setAllProducts, setLoading, clearSearch } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import { LoadingSpinner } from '../components/ui/Loading'
import { PrimaryButton } from '../components/ui/Button'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import FeaturesSection from '../components/home/FeaturesSection'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, loading } = useSelector((state) => state.products)

  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setLoading(true))
      dispatch(clearSearch())

      try {
        const result = await getProducts()
        dispatch(setAllProducts(result.products))
        dispatch(setProducts(result.products.slice(0, 8)))
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadProducts()
  }, [dispatch])

  const goToProducts = () => {
    navigate('/products')
    window.scrollTo(0, 0)
  }

  return (
    <div className="space-y-16">

      <HeroSection onNavigate={(path) => {
        navigate(path)
        window.scrollTo(0, 0)
      }} />

      <StatsSection />

      <FeaturesSection />

      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check out our most popular items this week
            </p>
          </div>
          <button
            onClick={goToProducts}
            className="hidden md:inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <PrimaryButton 
                onClick={goToProducts}
                className="inline-flex items-center space-x-2 text-lg"
              >
                <span>Explore All Products</span>
                <ArrowRight className="h-5 w-5" />
              </PrimaryButton>
            </div>
          </>
        )}
      </section>

      <section className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust Simple Store for all their shopping needs
          </p>
          <PrimaryButton 
            onClick={goToProducts}
            className="inline-flex items-center space-x-2 text-lg"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </PrimaryButton>
        </div>
      </section>
    </div>
  )
}

export default Home