import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { addToCart } from '../store/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/productsSlice'
import { formatCurrency } from '../utils/api'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { wishlist } = useSelector((state) => state.products)

  const isInWishlist = wishlist.find(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }))

    toast.success('Added to cart!')
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

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

  const handleProductClick = () => {
    navigate(`/product/${product.id}`)
    window.scrollTo(0, 0)
  }

  const getShortName = (name, maxLength = 50) => {
    if (name.length <= maxLength) return name
    return name.substring(0, maxLength) + '...'
  }

  const getStarRating = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <div 
      onClick={handleProductClick}
      className="card p-4 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 cursor-pointer group relative"
    >
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-6 right-6 z-10 p-2 rounded-full transition-all duration-200 ${
          isInWishlist 
            ? 'bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-red-500'
        }`}
      >
        <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
      </button>

      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />

        {product.price < 20 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Best Deal
          </span>
        )}
      </div>

      <div className="space-y-2">

        <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight min-h-[2.5rem] group-hover:text-primary-600 dark:group-hover:text-primary-400">
          {getShortName(product.name)}
        </h3>

        {product.rating && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {getStarRating(product.rating)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.reviewCount})
              </span>
            </div>
            {product.rating >= 4.5 && (
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                Top Rated
              </span>
            )}
          </div>
        )}

        <div className="space-y-1">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.price)}
          </div>
          {product.price > 50 && (
            <p className="text-xs text-green-600 dark:text-green-400">
              Free shipping
            </p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-all duration-200 flex items-center justify-center space-x-1 group-hover:bg-primary-700"
        >
          <ShoppingCart className="h-3 w-3" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard