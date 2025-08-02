import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutUsSection from './pages/About';
import ContactUsPage from './pages/Contact';
import ProductSection from './pages/Product';
import Navbar from './Components/Navbar';
import AuthPage from './pages/Login';
import Cart from './Components/Cart';
import CheckoutPage from './pages/ChcekoutOrder';
import MyOrders from './pages/Myorder';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [myOrders, setMyOrders] = useState([]);

  // ✅ Keep user logged in across refresh
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setProducts(products);
  }, []);

  // Cart logic
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setNotification(`${product.name} added to cart!`);
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setCart([]);
    setNotification('Thank you for your purchase!');
    setIsCartOpen(false);
  };

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) && (!maxPrice || product.price <= parseFloat(maxPrice));
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating));
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
  });

  return (
    <>
     <Navbar
  selectedRatings={selectedRatings}
  isCartOpen={isCartOpen}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  cart={cart}
  setIsCartOpen={setIsCartOpen}
  setIsFilterPaneOpen={setIsFilterPaneOpen}
  notificationCount={cart.length}
  isLoggedIn={isLoggedIn}
  setIsLoggedIn={setIsLoggedIn}
  user={user}
  setUser={setUser}
  updateQuantity={updateQuantity}         // ✅ FIXED
  removeFromCart={removeFromCart}         // ✅ FIXED
  handleCheckout={handleCheckout}         // ✅ FIXED
  getTotalPrice={getTotalPrice}           // ✅ FIXED
/>


      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              cart={cart}
              setIsCartOpen={setIsCartOpen}
              setIsFilterPaneOpen={setIsFilterPaneOpen}
              isFilterPaneOpen={isFilterPaneOpen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              products={filteredProducts}
              addToCart={addToCart}
              openProductModal={openProductModal}
              isCartOpen={isCartOpen}
              notification={notification}
              setNotification={setNotification}
              isModalOpen={isModalOpen}
              closeProductModal={closeProductModal}
              selectedProduct={selectedProduct}
              handleCheckout={handleCheckout}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              getTotalPrice={getTotalPrice}
            />
          }
        />
        <Route
  path="/checkout"
  element={
    <CheckoutPage
      cart={cart}
      getTotalPrice={getTotalPrice}
      handleCheckout={handleCheckout}
      user={user}
       setMyOrders={setMyOrders}
      myOrders={MyOrders}
    />
  }
/>

        <Route
          path="/About"
          element={
            <AboutUsSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              notification={notification}
              setNotification={setNotification}
              isFilterPaneOpen={isFilterPaneOpen}
              setIsFilterPaneOpen={setIsFilterPaneOpen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              handleCheckout={handleCheckout}
              getTotalPrice={getTotalPrice}
            />
          }
        />

        <Route path="/Contact" element={<ContactUsPage />} />
        <Route path="/Product" element={<ProductSection onAddToCart={addToCart} />} />
        <Route path="/Login" element={<AuthPage
            setIsLoggedIn={setIsLoggedIn}  // ✅ Login update
            setUser={setUser}              // ✅ Set user info
          />} 
        />
        <Route path="/my-orders" element={<MyOrders myOrders={myOrders} />} />
      </Routes>
    </>
  );
};

export default App;
