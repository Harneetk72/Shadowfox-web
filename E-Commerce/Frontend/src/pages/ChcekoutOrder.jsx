import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({
  cart,
  getTotalPrice,
  handleCheckout,
  setIsCartOpen,      // ✅ properly passed from App.jsx
  setMyOrders,        // ✅ passed to update order history
  myOrders            // ✅ current history
}) => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitOrder = () => {
    // 🔒 Validate address
    if (Object.values(address).some((val) => val.trim() === '')) {
      alert("Please fill in all address fields.");
      return;
    }
    else if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart before checking out.");
        return;

    }
    else{
        alert("Order placed successfully!");
        navigate("/Product");
    }

    // ✅ Create order object
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getTotalPrice(),
      address,
      paymentMethod,
      placedAt: new Date().toLocaleString(),
    };

    // ✅ Save to order history
    setMyOrders(prev => [...prev, newOrder]);

    // ✅ Clear cart
    handleCheckout();

    // ✅ Close cart UI
    setIsCartOpen(false);

    // ✅ Redirect to My Orders page
    navigate("/my-orders");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} className="input-field" />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} className="input-field" />
          <input type="text" name="street" placeholder="Street Address" onChange={handleInputChange} className="input-field" />
          <input type="text" name="city" placeholder="City" onChange={handleInputChange} className="input-field" />
          <input type="text" name="pincode" placeholder="Pincode" onChange={handleInputChange} className="input-field" />
        </div>

        {/* Payment & Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
          <div className="flex flex-col space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mr-2"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={() => setPaymentMethod('online')}
                className="mr-2"
              />
              Online Payment (Dummy)
            </label>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Order Summary</h3>
          <ul className="text-sm text-gray-600 max-h-40 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>₹{getTotalPrice().toFixed(2)}</span>
          </div>

          <button
            onClick={submitOrder}
            className="mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded transition"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Styling for inputs */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          outline: none;
        }
        .input-field:focus {
          border-color: #9c27b0;
          box-shadow: 0 0 0 1px #9c27b0;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
