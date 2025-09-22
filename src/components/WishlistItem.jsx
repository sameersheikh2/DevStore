import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/api";

const WishlistItem = ({ product, onRemove, onAddToCart, onProductClick }) => {
  const getShortName = (name, maxLength = 50) => {
    return name.length <= maxLength
      ? name
      : name.substring(0, maxLength) + "...";
  };

  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200 group relative">
      <button
        onClick={() => onRemove(product.id)}
        className="absolute top-6 right-6 z-10 p-2 bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full transition-all duration-200"
        title="Remove from wishlist"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div
        onClick={() => onProductClick(product.id)}
        className="cursor-pointer"
      >
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
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {product.rating >= 4.5 && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                    Top Rated
                  </span>
                )}
              </div>
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
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-2 px-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-all duration-200 flex items-center justify-center space-x-1"
        >
          <ShoppingCart className="h-3 w-3" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={() => onProductClick(product.id)}
          className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
