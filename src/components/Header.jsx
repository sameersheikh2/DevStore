import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { logOut } from "../authService";
import { toggleCart } from "../store/cartSlice";
import { setSearchQuery, clearSearch } from "../store/productsSlice";
import { clearUser } from "../store/authSlice";
import { useDarkMode } from "../hooks/useDarkMode";
import { IconButton } from "./ui/Button";
import Badge from "./ui/Badge";
import MobileMenu from "./layout/MobileMenu";
import UserMenu from "./layout/UserMenu";
import NavigationBar from "./layout/NavigationBar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQueryLocal] = useState("");
  const [isDark, setIsDark] = useDarkMode();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setSearchQuery(searchQuery.trim()));
      navigate("/products");
      window.scrollTo(0, 0);
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (path) => {
    if (path === "/") {
      dispatch(clearSearch());
    }
    navigate(path);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(clearUser());
      setIsUserMenuOpen(false);
      handleNavigation("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActivePage = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DS</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                DevStore
              </span>
            </button>

            <NavigationBar
              onNavigation={handleNavigation}
              isActivePage={isActivePage}
              isAuthenticated={isAuthenticated}
            />
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQueryLocal(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2.5 pl-10 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </form>

          <div className="flex items-center space-x-2">
            <IconButton onClick={() => setIsDark(!isDark)}>
              {isDark ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </IconButton>

            {isAuthenticated && (
              <IconButton
                onClick={() => handleNavigation("/wishlist")}
                title="My Wishlist"
                className="relative"
              >
                <Heart className="h-6 w-6" />
                <Badge count={wishlist.length} />
              </IconButton>
            )}

            <IconButton
              onClick={() => dispatch(toggleCart())}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              <Badge count={itemCount} />
            </IconButton>

            {isAuthenticated ? (
              <div className="relative">
                <IconButton onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  <User className="h-6 w-6" />
                </IconButton>

                <UserMenu
                  isOpen={isUserMenuOpen}
                  user={user}
                  wishlistCount={wishlist.length}
                  onNavigation={handleNavigation}
                  onLogout={handleLogout}
                  onClose={() => setIsUserMenuOpen(false)}
                />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/signup")}
                  className="px-4 py-2 bg-primary-600 text-white text-base font-medium rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </button>
              </div>
            )}

            <IconButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </IconButton>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQueryLocal(e.target.value)}
          onSearch={handleSearch}
          onNavigation={handleNavigation}
          isActivePage={isActivePage}
          isAuthenticated={isAuthenticated}
          wishlistCount={wishlist.length}
        />
      </div>
    </header>
  );
};

export default Header;
