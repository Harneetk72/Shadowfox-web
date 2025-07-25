import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from './logo.png';

const Header = ({
  searchTerm,
  setSearchTerm,
  Cart = [],
  setIsCartOpen,
  notificationCount = 0,
}) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // ✅ Check login status on load + listen to login/logout changes
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser?.name ? parsedUser : null);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Listen to login/logout from other tabs or dispatchEvent
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  // ✅ Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event('storage')); // force update
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center rounded-b-xl">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full shadow-md" />
          <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Shop<span className="text-yellow-300">Ease</span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white text-lg font-semibold hover:text-yellow-300">Home</Link>
          <Link to="/product" className="text-white text-lg font-semibold hover:text-yellow-300">Products</Link>
          <Link to="/about" className="text-white text-lg font-semibold hover:text-yellow-300">About</Link>
          <Link to="/contact" className="text-white text-lg font-semibold hover:text-yellow-300">Contact</Link>
        </nav>

        {/* Search + Auth + Cart */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-full bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 w-40 md:w-56 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-purple-500"></i>
          </div>

          {/* Profile / Auth */}
          {!user ? (
            <Link to="/login" className="px-4 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-purple-600 shadow-md">
              Login/Signup
            </Link>
          ) : (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-white text-purple-600 font-bold flex items-center justify-center shadow-md"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {showDropdown && (
                <div className="absolute bg-white text-black rounded shadow-md right-0 mt-2 w-40 z-50">
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white/80 hover:bg-yellow-300 text-purple-600 font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-2"
            aria-label="Shopping Cart"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
