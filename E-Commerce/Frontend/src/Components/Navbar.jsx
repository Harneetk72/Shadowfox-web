import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Cart from './Cart';



const Navbar = (props) => {
  return (
    <>
      <Header
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
        isCartOpen={props.isCartOpen}
        setIsCartOpen={props.setIsCartOpen}
        notification={props.notification}
        setNotification={props.setNotification}
        isFilterPaneOpen={props.isFilterPaneOpen}
        notificationCount={props.notificationCount}
      />
      <Cart
        isCartOpen={props.isCartOpen}
        setIsCartOpen={props.setIsCartOpen}
        cart={props.cart}
        updateQuantity={props.updateQuantity}
        removeFromCart={props.removeFromCart}
        handleCheckout={props.handleCheckout}
        getTotalPrice={props.getTotalPrice}
      />
    </>
  );
};

export default Navbar;
