import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IonIcon = ({ name, className = '' }) => {
    useEffect(() => {
        const scriptId = 'ionicons-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'module';
            script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
            document.body.appendChild(script);

            const scriptNomodule = document.createElement('script');
            scriptNomodule.nomodule = true;
            scriptNomodule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
            document.body.appendChild(scriptNomodule);
        }
    }, []);
    return <ion-icon name={name} class={className}></ion-icon>;
};

const Cart = ({
    isCartOpen,
    setIsCartOpen,
    cart = [],
    updateQuantity,
    removeFromCart,
    handleCheckout,
    getTotalPrice,
}) => {
    const navigate = useNavigate();
    const calculateTotalPrice = typeof getTotalPrice === 'function' ? getTotalPrice : () => '0.00';

    return (
        <>
            <aside
                className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${
                    isCartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Shopping Cart"
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-purple-700">Shopping Cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-600 hover:text-pink-600 text-2xl focus:outline-none"
                        aria-label="Close cart"
                    >
                        <IonIcon name="close-outline" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar-light">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between mb-4 border-b pb-2 last:border-b-0"
                            >
                                <img
                                    src={item.imageDefault || item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/64x64/DDDDDD/666666?text=Img';
                                    }}
                                />
                                <div className="flex-1 ml-4">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 text-lg font-bold text-gray-600 hover:text-purple-600 rounded-md transition-colors"
                                            aria-label={`Decrease quantity of ${item.name}`}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 text-gray-800">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 text-lg font-bold text-gray-600 hover:text-purple-600 rounded-md transition-colors"
                                            aria-label={`Increase quantity of ${item.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <span className="font-bold text-green-600 text-lg">
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN', {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-4 p-2 text-red-500 hover:text-red-700 rounded-full transition-colors"
                                    aria-label={`Remove ${item.name} from cart`}
                                >
                                    <IonIcon name="trash-outline" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-800">Total:</span>
                        <span className="text-xl font-bold text-green-600">
                            ₹{Number(calculateTotalPrice()).toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            setIsCartOpen(false);
                            const user = localStorage.getItem('user');
                            if (!user) {
                                alert('Please login to proceed to checkout.');
                                navigate('/login');
                            } else {
                                navigate('/checkout');
                            }
                        }}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-full transition-colors duration-300 shadow-md"
                    >
                        Checkout
                    </button>
                </div>
            </aside>

            <style jsx="true">{`
                .custom-scrollbar-light::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-track {
                    background: #e0e0e0;
                    border-radius: 10px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-thumb {
                    background: #9c27b0;
                    border-radius: 10px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
                    background: #7b1fa2;
                }
            `}</style>
        </>
    );
};

export default Cart;
