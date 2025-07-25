import React from 'react';
const MyOrders = ({ myOrders }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Order History</h1>
      {myOrders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        myOrders.map(order => (
          <div key={order.id} className="border p-4 mb-4 rounded-md shadow">
            <p><strong>Placed On:</strong> {order.placedAt}</p>
            <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
            <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>

            <div className="mt-2">
              <p><strong>Shipping Address:</strong></p>
              <p>{order.address.name}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}</p>
            </div>

            <div className="mt-3">
              <strong>Items:</strong>
              <ul className="list-disc ml-6">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
