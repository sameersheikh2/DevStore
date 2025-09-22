import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, ShoppingCart, Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { getProductById, formatCurrency } from '../utils/api'
import { addToCart } from '../store/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/productsSlice'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { wishlist } = useSelector((state) => state.products)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const isInWishlist = product && wishlist.find(item => item.id === product.id)

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return

      setLoading(true)
      try {
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleBack = () => {
    navigate(-1)
    window.scrollTo(0, 0)
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }))
      }
      toast.success(`Added ${quantity} ${product.name}(s) to cart!`)
    }
  }

  const handleWishlistToggle = () => {
    if (!product) return

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast.success('Removed from wishlist')
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        category: product.category
      }))
      toast.success('Added to wishlist!')
    }
  }

  const getRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 border-2 border-gray-300 dark:border-gray-600 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <div className="card p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const features = [
    { icon: <Truck className="h-5 w-5" />, text: 'Free shipping on orders over $50' },
    { icon: <Shield className="h-5 w-5" />, text: 'Secure payment guaranteed' },
    { icon: <RotateCcw className="h-5 w-5" />, text: '30-day return policy' }
  ]

  return (
    <div className="space-y-6">

      <div className="flex items-center space-x-4">
        <button 
          onClick={handleBack}
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-primary-600 dark:hover:text-primary-400">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-primary-600 dark:hover:text-primary-400">Products</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white capitalize">{product.category}</span>
        </nav>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">

          <div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                loading="lazy"
              />
            </div>

            {product.price < 20 && (
              <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Best Deal
              </div>
            )}
          </div>

          <div className="space-y-6">

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium capitalize">
                  {product.category}
                </span>
                {product.rating >= 4.5 && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                    Top Rated
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {product.rating && (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center">
                    {getRatingStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating}/5 ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </div>
              {product.price > 50 && (
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Free shipping
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white">What's included:</h4>
              <div className="grid grid-cols-1 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="text-primary-600 dark:text-primary-400">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <div className="text-sm text-green-600 dark:text-green-400">
                  {product.stock} in stock
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add {quantity} to Cart</span>
                </button>

                <button 
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 border rounded-lg flex items-center justify-center space-x-2 ${
                    isInWishlist 
                      ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  <span>{isInWishlist ? 'Saved' : 'Save'}</span>
                </button>

                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail