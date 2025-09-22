import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Package, Heart } from "lucide-react";
import { removeFromWishlist } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import EmptyState from "../components/ui/EmptyState";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import WishlistItem from "../components/WishlistItem";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
    toast.success("Added to cart!");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  if (!isAuthenticated) {
    return (
      <EmptyState
        icon={<Heart className="h-8 w-8 text-red-500" />}
        title="Login Required"
        message="Please log in to view your wishlist and saved items."
        actionButton={
          <PrimaryButton onClick={() => handleNavigation("/login")}>
            Sign In
          </PrimaryButton>
        }
      />
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => handleNavigation("/products")}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <EmptyState
          icon={<Heart className="h-12 w-12 text-red-500" />}
          title="Your wishlist is empty"
          message="Save items you love by clicking the heart icon on any product. They'll appear here for easy access later!"
          actionButton={
            <>
              <PrimaryButton onClick={() => handleNavigation("/products")}>
                <Package className="h-4 w-4 mr-2" />
                Start Shopping
              </PrimaryButton>
              <SecondaryButton onClick={() => handleNavigation("/profile")}>
                Back to Profile
              </SecondaryButton>
            </>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleNavigation("/profile")}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Profile</span>
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <SecondaryButton onClick={() => handleNavigation("/products")}>
            Add More Items
          </SecondaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <WishlistItem
            key={product.id}
            product={product}
            onRemove={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      <div className="mt-12 text-center card p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Keep Shopping
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Discover more amazing products and add them to your wishlist for
          later.
        </p>
        <PrimaryButton onClick={() => handleNavigation("/products")}>
          Browse All Products
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Wishlist;
