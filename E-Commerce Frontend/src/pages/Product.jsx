import React, { useState, useEffect,  } from 'react'; // Fixed syntax error here
import Cart from '../Components/Cart';
import FilterPane from '../Components/FilterPane';

// Helper component for Ionicons
const IonIcon = ({ name, className = '' }) => {
    // Dynamically load Ionicons script if not already present
    useEffect(() => {
        const scriptId = 'ionicons-script-product-section'; // Unique ID for this component's script
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

// Product Card Component
const ProductCard = ({ product, onQuickView, onAddToWishlist, onCompare, onAddToCart, onProductClick }) => {
    return (
        <div className="showcase bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl group flex flex-col">
            <div className="showcase-banner relative">
                {/* Clicking the image or title will show details */}
                <img src={product.imageDefault} alt={product.name} width="300" className="product-img default w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-0 cursor-pointer" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/CCCCCC/666666?text=Image+Error'; }} onClick={() => onProductClick(product)} />
                <img src={product.imageHover} alt={product.name} width="300" className="product-img hover absolute top-0 left-0 w-full h-48 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/CCCCCC/666666?text=Image+Error'; }} onClick={() => onProductClick(product)} />

                {product.badge && (
                    <p className={`showcase-badge absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${product.badge.type === 'sale' ? 'bg-black text-white' : 'bg-pink-600 text-white'}`}>
                        {product.badge.text}
                    </p>
                )}

                {/* Showcase actions (wishlist, quick view, compare) - still on hover */}
                <div className="showcase-actions absolute bottom-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => onAddToWishlist(product)} className="btn-action bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 hover:text-pink-600 transition-colors" aria-label="Add to wishlist">
                        <IonIcon name="heart-outline" />
                    </button>
                    <button onClick={() => onQuickView(product)} className="btn-action bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 hover:text-pink-600 transition-colors" aria-label="Quick view">
                        <IonIcon name="eye-outline" />
                    </button>
                    <button onClick={() => onCompare(product)} className="btn-action bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 hover:text-pink-600 transition-colors" aria-label="Compare">
                        <IonIcon name="repeat-outline" />
                    </button>
                </div>
            </div>

            <div className="showcase-content p-4 flex-grow flex flex-col justify-between">
                <a href="#" className="showcase-category text-sm text-gray-500 hover:text-purple-600 transition-colors mb-1">{product.category}</a>
                <h3>
                    {/* Clicking the title will show details */}
                    <a href="#" className="showcase-title text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors line-clamp-2 cursor-pointer" onClick={() => onProductClick(product)}>{product.name}</a>
                </h3>
                <div className="showcase-rating flex items-center my-2">
                    {[...Array(5)].map((_, i) => (
                        <IonIcon key={i} name={i < product.rating ? "star" : "star-outline"} className="text-yellow-500 text-sm" />
                    ))}
                </div>
                <div className="price-box flex items-baseline space-x-2 mb-4"> {/* Added mb-4 for spacing before button */}
                    <p className="price text-lg font-bold text-green-600"> ₹{product.price.toFixed(2)}</p>
                    {product.oldPrice && <del className="text-gray-500 text-sm"> ₹{product.oldPrice.toFixed(2)}</del>}
                </div>

                {/* Always visible Add to Cart button */}
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                    aria-label={`Add ${product.name} to cart`}
                >
                    <IonIcon name="bag-add-outline" className="text-xl" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

// Product Minimal Component
const ProductMinimal = ({ title, products, onQuickView, onAddToWishlist, onCompare, onAddToCart, onProductClick }) => {
    return (
        <div className="product-showcase mb-8">
            <h2 className="title text-2xl font-bold text-purple-700 mb-6">{title}</h2>
            <div className="showcase-wrapper">
                <div className="showcase-container flex flex-wrap gap-4 justify-center md:justify-start">
                    {products.map(product => (
                        <div key={product.id} className="showcase flex-shrink-0 w-64 bg-white rounded-lg shadow-md flex items-center p-4 space-x-3 transition-transform duration-200 hover:scale-105">
                            {/* Clicking the image or title will show details */}
                            <a href="#" className="showcase-img-box w-20 h-20 flex-shrink-0 cursor-pointer" onClick={() => onProductClick(product)}>
                                <img src={product.imageDefault} alt={product.name} width="70" className="showcase-img w-full h-full object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/70x70/DDDDDD/666666?text=Img'; }} />
                            </a>
                            <div className="showcase-content flex-grow">
                                {/* Clicking the title will show details */}
                                <a href="#" onClick={() => onProductClick(product)}>
                                    <h4 className="showcase-title text-base font-medium text-gray-800 hover:text-pink-600 line-clamp-2 cursor-pointer">{product.name}</h4>
                                </a>
                                <a href="#" className="showcase-category text-xs text-gray-500 hover:text-purple-600 transition-colors">{product.category}</a>
                                <div className="price-box flex items-baseline space-x-2 mt-1">
                                    <p className="price text-base font-bold text-green-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
</p>
                                    {product.oldPrice && <del className="text-gray-500 text-sm">${product.oldPrice.toFixed(2)}</del>}
                                </div>
                                {/* Add to Cart button for minimal product */}
                                <button
                                    onClick={() => onAddToCart(product)}
                                    className="mt-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold py-1.5 px-3 rounded-full transition-colors duration-300 shadow-sm flex items-center justify-center space-x-1"
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    <IonIcon name="bag-add-outline" className="text-base" />
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Product Featured Component
const ProductFeatured = ({ product, onAddToCart, onProductClick }) => {
    if (!product) return null;

    const [hours, setHours] = useState(24);
    const [minutes, setMinutes] = useState(59);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev === 0) {
                    setMinutes(m => {
                        if (m === 0) {
                            setHours(h => {
                                if (h === 0) {
                                    setDays(d => d > 0 ? d - 1 : d);
                                    return 23;
                                }
                                return h - 1;
                            });
                            return 59;
                        }
                        return m - 1;
                    });
                    return 59;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="product-featured mb-8">
            <h2 className="title text-2xl font-bold text-purple-700 mb-6">Deal of the day</h2>
            <div className="showcase-wrapper">
                <div className="showcase-container flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="showcase flex-shrink-0 w-full md:w-[600px] bg-white rounded-xl shadow-lg flex flex-col md:flex-row p-6 items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                        <div className="showcase-banner w-full md:w-1/2 flex justify-center">
                            {/* Clicking the image will show details */}
                            <img src={product.imageDefault} alt={product.name} className="showcase-img w-full h-auto max-h-64 object-contain rounded-lg cursor-pointer" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/CCCCCC/666666?text=Image+Error'; }} onClick={() => onProductClick(product)} />
                        </div>
                        <div className="showcase-content w-full md:w-1/2 text-center md:text-left">
                            <div className="showcase-rating flex justify-center md:justify-start items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <IonIcon key={i} name={i < product.rating ? "star" : "star-outline"} className="text-yellow-500 text-base" />
                                ))}
                            </div>
                            {/* Clicking the title will show details */}
                            <a href="#" onClick={() => onProductClick(product)}>
                                <h3 className="showcase-title text-xl font-bold text-gray-800 hover:text-pink-600 mb-2 line-clamp-2 cursor-pointer">{product.name}</h3>
                            </a>
                            <p className="showcase-desc text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                            <div className="price-box flex items-baseline justify-center md:justify-start space-x-3 mb-4">
                                <p className="price text-2xl font-extrabold text-green-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
</p>
                                {product.oldPrice && <del className="text-gray-500 text-lg">${product.oldPrice.toFixed(2)}</del>}
                            </div>
                            <button onClick={() => onAddToCart(product)} className="add-cart-btn w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-md">
                                add to cart
                            </button>
                            <div className="showcase-status mt-6">
                                <div className="flex justify-between text-sm text-gray-700 mb-2">
                                    <p>already sold: <b>{product.sold}</b></p>
                                    <p>available: <b>{product.available}</b></p>
                                </div>
                                <div className="showcase-status-bar h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(product.sold / (product.sold + product.available)) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="countdown-box mt-6 text-center">
                                <p className="countdown-desc text-gray-600 text-sm mb-3">Hurry Up! Offer ends in:</p>
                                <div className="countdown flex justify-center space-x-4">
                                    <div className="countdown-content flex flex-col items-center">
                                        <p className="display-number text-2xl font-bold text-purple-700">{hours}</p>
                                        <p className="display-text text-xs text-gray-500">Hours</p>
                                    </div>
                                    <div className="countdown-content flex flex-col items-center">
                                        <p className="display-number text-2xl font-bold text-purple-700">{minutes}</p>
                                        <p className="display-text text-xs text-gray-500">Min</p>
                                    </div>
                                    <div className="countdown-content flex flex-col items-center">
                                        <p className="display-number text-2xl font-bold text-purple-700">{seconds}</p>
                                        <p className="display-text text-xs text-gray-500">Sec</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Product Grid Component
const ProductGrid = ({ title, products, onQuickView, onAddToWishlist, onCompare, onAddToCart, onProductClick }) => {
    return (
        <div className="product-main">
            <h2 className="title text-2xl font-bold text-purple-700 mb-6">{title}</h2>
            <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={onQuickView}
                        onAddToWishlist={onAddToWishlist}
                        onCompare={onCompare}
                        onAddToCart={onAddToCart}
                        onProductClick={onProductClick} // Pass the click handler
                    />
                ))}
            </div>
        </div>
    );
};

// NEW: Product Detail View Component
const ProductDetailView = ({ product, onBack, onAddToCart }) => {
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <p>No product selected.</p>
                <button
                    onClick={onBack}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow-md"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-page bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col gap-6 animate-fade-in">
            <button
                onClick={onBack}
                className="self-start bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center space-x-2"
            >
                <IonIcon name="arrow-back-outline" />
                <span>Back to Products</span>
            </button>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Product Image */}
                <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-50 rounded-lg">
                    <img
                        src={product.imageDefault}
                        alt={product.name}
                        className="max-w-full max-h-96 object-contain rounded-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/CCCCCC/666666?text=Image+Error'; }}
                    />
                </div>

                {/* Product Info */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-2">{product.category}</p>
                    <div className="showcase-rating flex items-center justify-center md:justify-start my-2">
                        {[...Array(5)].map((_, i) => (
                            <IonIcon key={i} name={i < product.rating ? "star" : "star-outline"} className="text-yellow-500 text-xl" />
                        ))}
                        <span className="text-gray-600 ml-2 text-sm">({product.reviews ? product.reviews.length : 0} Reviews)</span>
                    </div>
                    <div className="price-box flex items-baseline justify-center md:justify-start space-x-3 mb-4">
                        <p className="price text-3xl font-extrabold text-green-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
</p>
                        {product.oldPrice && <del className="text-gray-500 text-xl">${product.oldPrice.toFixed(2)}</del>}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                    <button
                        onClick={() => onAddToCart(product)}
                        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-md flex items-center justify-center space-x-2 mx-auto md:mx-0"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <IonIcon name="bag-add-outline" className="text-xl" />
                        <span>Add to Cart</span>
                    </button>

                    {product.sold && product.available && (
                        <div className="showcase-status mt-6">
                            <div className="flex justify-between text-sm text-gray-700 mb-2">
                                <p>already sold: <b>{product.sold}</b></p>
                                <p>available: <b>{product.available}</b></p>
                            </div>
                            <div className="showcase-status-bar h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(product.sold / (product.sold + product.available)) * 100}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section mt-8 border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="review-card bg-gray-50 p-4 rounded-lg shadow-sm">
                                <div className="flex items-center mb-2">
                                    <p className="font-semibold text-gray-800 mr-2">{review.author}</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <IonIcon key={i} name={i < review.rating ? "star" : "star-outline"} className="text-yellow-500 text-sm" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm italic">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                )}
            </div>
        </div>
    );
};


/**
 * ProductSection Component
 * Encapsulates the product display area, including category filtering and various product showcases.
 * Manages its own product data and filtering state.
 *
 * @param {function} onQuickView - Callback for quick view action on a product.
 * @param {function} onAddToWishlist - Callback for adding a product to wishlist.
 * @param {function} onCompare - Callback for comparing a product.
 * @param {function} onAddToCart - Callback for adding a product to cart.
 */
const ProductSection = ({
    onQuickView,
    onAddToWishlist,
    onCompare,
    onAddToCart,
    cart = [],
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    getTotalPrice,
    handleCheckout,
    selectedCategories = [],
    setSelectedCategories,
    selectedBrands = [],
    setSelectedBrands,
    minPrice = '',
    setMinPrice,
    maxPrice = '',
    setMaxPrice,
    selectedRatings = [],
    setSelectedRatings,
    products = [], // This prop is not currently used, allProducts is defined internally
    notificationCount = 0,
    setNotificationCount
}) => {
    // Mock Product Data - Placed at the very top for proper initialization
    const allProducts = [
        { id: 1, name: 'Mens Winter Leathers Jackets', category: 'jacket', price: 48.00, oldPrice: 75.00, rating: 3, imageDefault: 'https://thesparkshop.in.net/wp-content/uploads/2024/11/Men-Winter-Leather-Jackets-1.webp', imageHover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-XRSP2uCValJAetwvlSb20lxj9Nt_eBl528TPi-fQGKXkNiXn-8aFaB6LrddVhBoKE0&usqp=CAU', description: 'Experience ultimate warmth and style with our premium men\'s winter leather jackets. Crafted from genuine leather, these jackets offer superior insulation and a timeless look, perfect for cold weather.', sold: 20, available: 40, reviews: [{ author: 'John D.', rating: 4, comment: 'Great jacket, very warm!' }, { author: 'Jane S.', rating: 3, comment: 'Stylish but a bit stiff.' }] },
        { id: 2, name: 'Pure Garment Dyed Cotton Shirt', category: 'shirt', price: 45.00, oldPrice: 56.00, rating: 3, imageDefault: 'https://assets.ajio.com/medias/sys_master/root/20240618/X9J0/66718e6a6f60443f314d22c5/-473Wx593H-700102580-pink-MODEL.jpg', imageHover: 'https://assets.ajio.com/medias/sys_master/root/20210511/DsVX/6099b4dcaeb269a9e3ba662b/-473Wx593H-462405540-white-MODEL2.jpg', badge: { type: 'sale', text: 'sale' }, description: 'Comfortable cotton shirt for everyday wear. Made with garment-dyed pure cotton for a soft feel and unique color.', reviews: [{ author: 'Alice B.', rating: 5, comment: 'Very comfortable and soft!' }] },
        { id: 3, name: 'MEN Yarn Fleece Full-Zip Jacket', category: 'Jacket', price: 58.00, oldPrice: 65.00, rating: 3, imageDefault: 'https://media.gq.com/photos/6349ad2f9d25c9e8e2eb4c32/3:4/w_320,c_limit/16.jpg', imageHover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGldURN1agSrFI1VKk9FQ1q3Gv7KwxbMXn36q92aNMUIAlNGhWXO_CECyyPdBBqzbySQ&usqp=CAU', description: 'Warm fleece jacket for outdoor activities. Features a full-zip design and soft yarn fleece material for maximum comfort.', reviews: [] },
        { id: 4, name: 'Black Floral Wrap Midi Skirt', category: 'skirt', price: 25.00, oldPrice: 35.00, rating: 5, imageDefault: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2025/FEBRUARY/28/piSGzn3O_cbe15d8c74f545cead088c54019eec13.jpg', imageHover: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/2025/JUNE/16/nP4uiZli_6ac976c2d6224a91957ce9c83cbc5d57.jpg', badge: { type: 'new', text: 'new' }, description: 'Elegant floral midi skirt for a stylish look. Perfect for casual outings or semi-formal events.', reviews: [{ author: 'Emily R.', rating: 5, comment: 'Absolutely love this skirt! Fits perfectly.' }] },
        { id: 5, name: 'Casual Men\'s Brown shoes', category: 'casual', price: 99.00, oldPrice: 105.00, rating: 5, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQ9IyR5KriS6ealwEqVdZSCS_VJDeGR0aGHCye4683LxwNkvwvXU-gzEWEOIf2gkm4C0&usqp=CAU', imageHover: 'https://assets.ajio.com/medias/sys_master/root/20240806/ceBM/66b218d31d763220fa62009a/-473Wx593H-700191363-brown-MODEL.jpg', description: 'Comfortable brown shoes for casual outings. Durable and stylish, suitable for everyday wear.', reviews: [{ author: 'David L.', rating: 4, comment: 'Good quality, comfortable for long walks.' }] },
        { id: 6, name: 'Pocket Watch Leather Pouch', category: 'watches', price: 150.00, oldPrice: 170.00, rating: 3, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBTNZOXnz_8-kU_k72FSKpSu9CabeGbG5XWgW7pYlS9CN1hNk1BAZrQ7FRCZ4SQnWJ5QA&usqp=CAU', imageHover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-UXE9ABTgrgoYBD364H9atjVd0gkauqTgg&s', badge: { type: 'sale', text: 'sale' }, description: 'Classic pocket watch with a leather pouch. A perfect blend of vintage charm and modern craftsmanship.', reviews: [] },
        { id: 7, name: 'Smart watche Vital Plus', category: 'watches', price: 100.00, oldPrice: 120.00, rating: 4, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUc4RJzRq12G-g5_fLaa0pNz1J_d9MfUGYG03uhGJclVH8dv5PXtmtTtX5poNny72XYog&usqp=CAU', imageHover: 'https://imfitindia.com/cdn/shop/products/41Z9H-rfzYL_1024x1024.jpg?v=1640755557', description: 'Advanced smartwatch with vital tracking features. Monitor your health, receive notifications, and stay connected on the go.', reviews: [{ author: 'Chris W.', rating: 4, comment: 'Great features, battery life could be better.' }] },
        { id: 8, name: 'Womens Party Wear Shoes', category: 'party wear', price: 25.00, oldPrice: 30.00, rating: 3, imageDefault: 'https://5.imimg.com/data5/JX/PT/BW/SELLER-83512713/party-wear-footwear-500x500.jpg', imageHover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8qsRoJz3By8DEQp8pQhX8zTLeqBXAjJdBn9t6693mBFOKcT9cDyO6Kwwfy5WzYqtQzE&usqp=CAU', badge: { type: 'sale', text: 'sale' }, description: 'Stylish shoes for party occasions. Designed for comfort and elegance, perfect for dancing the night away.', reviews: [] },
        { id: 9, name: 'Mens Winter Leathers Jackets', category: 'jacket', price: 32.00, oldPrice: 45.00, rating: 4, imageDefault: 'https://i.pinimg.com/736x/d4/54/05/d45405790ac71e7ef3deaef16d822eae.jpg', imageHover: 'https://tiimg.tistatic.com/fp/1/008/371/mens-casual-wear-full-sleeve-designer-leather-jacket-227.jpg', description: 'Durable leather jacket for harsh winters. Provides excellent protection against cold while maintaining a fashionable appearance.', reviews: [{ author: 'Mark T.', rating: 4, comment: 'Very durable and warm, good value.' }] },
        { id: 10, name: 'Trekking & Running Shoes - black', category: 'sports', price: 58.00, oldPrice: 64.00, rating: 3, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0OETz7CrO4yOetx4Ho8X2QmygLYKWTvRUw&s', imageHover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTmpNfYueXFpKtbvEm8qARWBiFarjDMmVMHw&s', badge: { type: 'sale', text: 'sale' }, description: 'High-performance shoes for trekking and running. Lightweight and breathable, offering superior grip and comfort on any terrain.', reviews: [] },
        { id: 11, name: 'Men\'s Leather Formal Wear shoes', category: 'formal', price: 50.00, oldPrice: 65.00, rating: 4, imageDefault: 'https://assets.myntassets.com/f_auto,q_auto:eco,dpr_1.3,w_158,c_limit,fl_progressive/v1/assets/images/29743224/2024/5/27/9a3e63c3-5524-4e61-9c11-02f2eaab1f171716804631990DukeMenFormalDerbys1.jpg', imageHover: 'https://teakwoodleathers.com/cdn/shop/files/T_SH_CL_103_TN.jpg?v=1750932987', description: 'Elegant leather shoes for formal occasions. Crafted with genuine leather for a sophisticated and comfortable fit.', reviews: [{ author: 'Robert G.', rating: 5, comment: 'Perfect for office and events.' }] },
        { id: 12, name: 'Better Basics French Terry Sweatshorts', category: 'shorts', price: 78.00, oldPrice: 85.00, rating: 3, imageDefault: 'https://www.ardene.com/on/demandware.static/-/Sites-master-catalog/default/dw91b8e6e4/images/large/4A-AP33085-05-460c95eb-bf0f-46a6-a551-7c6f0d53829a.jpg', imageHover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2_TV0fbQtgTQzf2l6fQqlu3C3tGjXUl_YGfw0b1ifm6uI7H6aBevgsw9xmWMxpXctG3A&usqp=CAU', badge: { type: 'sale', text: 'sale' }, description: 'Comfortable French terry sweatshorts. Ideal for lounging or light workouts, offering maximum flexibility and softness.', reviews: [] },
        { id: 13, name: 'shampoo, conditioner & facewash packs', category: 'cosmetics', price: 150.00, oldPrice: 200.00, rating: 2, imageDefault: 'https://5.imimg.com/data5/SELLER/Default/2024/2/390804840/YD/CS/BN/136009990/2-22-500x500.jpg',imageHover:'https://media6.ppl-media.com//tr:h-750,w-750,c-at_max,dpr-2,q-40/static/img/product/400035/mamaearth-everyday-nourish-and-cleanse-essential-kit-ubtan-facewash-rosemay-anti-hair-fall-shampoo-rosemay-anti-hair-fall-conditioner-rosemary-hair-oil-100-ml-250-ml-250-ml-150-ml_2_display_1705210215_2fc2440b.jpg' ,description: 'Complete hair and face care pack. Includes shampoo, conditioner, and facewash for a comprehensive daily routine.', sold: 20, available: 40, reviews: [{ author: 'Sarah P.', rating: 3, comment: 'Good value for money, but shampoo is average.' }] },
        { id: 14, name: 'Rose Gold diamonds Earring', category: 'Jewellery', price: 1990.00, oldPrice: 2000.00, rating: 2, imageDefault: 'https://static.malabargoldanddiamonds.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/r/erdzl43244_c.jpg', description: 'Exquisite rose gold diamond earrings. A stunning piece of jewelry, perfect for special occasions or as a gift.', imageHover:'https://www.giva.co/cdn/shop/files/GDLER0323_5.jpg?v=1728572016&width=1946' ,sold: 15, available: 40, reviews: [{ author: 'Olivia M.', rating: 5, comment: 'Absolutely beautiful! Sparkles wonderfully.' }] },
        { id: 15, name: 'baby fabric shoes', category: 'shoes', price: 4.00, oldPrice: 5.00, rating: 5, imageDefault: 'https://images.meesho.com/images/products/288039782/tnvhy_512.webp', imageHover:'https://images.meesho.com/images/products/292969643/uwwyb_512.webp',description: 'Soft fabric shoes for babies. Designed for comfort and gentle support for little feet.', reviews: [{ author: 'Mommy B.', rating: 5, comment: 'So cute and soft for my baby!' }] },
        { id: 16, name: 'men\'s hoodies t-shirt', category: 'clothes', price: 7.00, oldPrice: 17.00, rating: 4.5, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrcLjccVQg8Utj0y2GbUh15qnCTPuRu9-3-g&s',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe12hxvoC8asDHd9LHGbkUaZBTVvzKVku0Ag&s', description: 'Comfortable hoodies t-shirt for men. A versatile addition to any casual wardrobe, offering warmth and style.', reviews: [] },
        { id: 17, name: 'girls t-shirt', category: 'clothes', price: 3.00, oldPrice: 5.00, rating: 4.5, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_JNQIGdYWq7_UUSGohy0D6WnbLN3q9UmWCF0YNtGdeBhcBrMIn9iabB079A5IPE4JTwU&usqp=CAU',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGK3t_iKewTUNho0RIvDbmE41jibws4fNvlQ&s', description: 'Cute t-shirt for girls. Made from soft, breathable fabric, perfect for everyday wear.', reviews: [{ author: 'Parent A.', rating: 4, comment: 'My daughter loves it, good fit.' }] },
        { id: 18, name: 'woolen hat for men', category: 'hat & caps', price: 12.00, oldPrice: 15.00, rating: 5, imageDefault: 'https://m.media-amazon.com/images/I/71gs2ikRf5L._UY1000_.jpg',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYdrNDjqLhWLaZy0dMbakr1VYjcGwmO0OBsg&s' ,description: 'Warm woolen hat for men. Essential for winter, providing excellent insulation and a snug fit.', reviews: [] },
        { id: 19, name: 'Relaxed Short full Sleeve T-Shirt', category: 'Clothes', price: 45.00, oldPrice: 12.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5kX03ITQe6lDxJhcZqQuBt2xgjjGywsCqw&s',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfBS408vyH6fjXotJPD_6ylhzDy7il1BUv3g&s', description: 'Relaxed fit t-shirt with full sleeves. Comfortable and stylish for a laid-back look.', reviews: [] },
        { id: 20, name: 'Girls pnk Embro design Top', category: 'Clothes', price: 61.00, oldPrice: 9.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmzYWdoZawSz0OpSLBCU6dxm3vO6sNrPA_JA&s',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfG_1pG1bM3HatOmaJMM08fz3yV4G_CZl71A&s', description: 'Pink embroidered design top for girls. A fashionable choice with intricate embroidery.', reviews: [] },
        { id: 21, name: 'Running & Trekking Shoes - White', category: 'Sports', price: 49.00, oldPrice: 15.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDr3_fWY8Q8ccNWGZo376sMQuq3aQQBGhYw&s',imageHover:'https://redtape.com/cdn/shop/products/8-800x800_029c3915-de1f-402c-8196-462bae190ebf.jpg?v=1750054380' ,description: 'White running and trekking shoes. Designed for durability and comfort on various terrains.', reviews: [] },
        { id: 22, name: 'cosmetic product', category: 'cosmetic', price: 78.00, oldPrice: 36.00, rating: 0, imageDefault: 'https://skyatransdermic.com/cdn/shop/articles/Top_10_Cosmetic_Companies_in_Uganda.jpg?v=1734583296',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeErko8vo1NJOMHFxODg-TgsBiRKh2KvVQ-4BTA3FX2w4Rp_mTsOj8aE62I4m6pD5gOks&usqp=CAU', description: 'A high-quality cosmetic product for your daily beauty routine. Enhances natural glow and provides essential nourishment.' },
        { id: 23, name: 'Toys', category: 'Toys', price: 94.00, oldPrice: 42.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RcreIDrpfebZGjROp6mIbVrw31weysJXEQ&s',imageHover:'https://cdn.firstcry.com/education/2022/11/06094158/Toy-Names-For-Kids.jpg', description: 'A fun and engaging toy for children of all ages. Promotes imaginative play and cognitive development.' },
        { id: 24, name: 'Headphone', category: 'Elecyronic', price: 54.00, oldPrice: 65.00, rating: 0, imageDefault: 'https://www.portronics.com/cdn/shop/files/Portronics_Muff_M3_best_headphones_under_5000.jpg?v=1744893854',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tldHo-FqDlbdOdD00nKNJMmkF0qvTObHLw&s' ,description: 'Immersive sound experience with these high-fidelity headphones. Perfect for music lovers and gamers alike.' },
        { id: 25, name: 'Laptop', category: 'Electronic', price: 52.00, oldPrice: 55.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmEkUkVV1nnzjp14mZCIo6Qe6upwRP3QBuw&s',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQ5ZIIveHfwjsHQ1q68xfgUZDg-WK-0VHHw&sZ', description: 'Powerful and sleek laptop for all your computing needs. Ideal for work, study, and entertainment on the go.' },
        { id: 26, name: 'Boot With Suede Detail', category: 'boots', price: 20.00, oldPrice: 30.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32yZRadOH5zFW3StnhrBJ_Ha_0y6Zip66wA&s',imageHover:'https://fausto.in/cdn/shop/products/FST_3941_BROWN_MODEL_400x.jpg?v=1680264253', description: 'Boot with stylish suede detail. A perfect blend of ruggedness and sophistication for any outfit.' },
        { id: 27, name: 'Girls party wear dress', category: 'cloths', price: 56.00, oldPrice: 78.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08OcPvfZF1JDe0Q6IRaJ2FByiqybAe75yDw&s',imageHover:'https://m.media-amazon.com/images/I/81FI4CWKN+L._UY350_.jpg' ,description: 'Elegant party wear dress for girls. Designed to make her stand out at any special occasion.' },
        { id: 28, name: 'perfume', category: 'Perfume', price: 50.00, oldPrice: 55.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy78JTAV4bOOjhVGboUBtf_9Hkp5nruJRjYw&s',imageHover:'https://bellavitaorganic.com/cdn/shop/files/Fresh_100_ml.jpg?v=1728034537&width=1000', description: 'Exquisite perfume with a long-lasting fragrance. A perfect accessory to complete your personal style.' },
        { id: 29, name: 'Necklace', category: 'jewellery', price: 50.00, oldPrice: 34.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKz86ThXnUPunoLWSohwHRlXEDewdPtcpsgw&s',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4cqTtr6-RnapGTdqw8MMzeUZHPsXg6McCrjsrXt_DLWKSWcTgGRtcMqSGwTVxbSkSfXQ&usqp=CAU', description: 'Beautifully crafted necklace that adds a touch of elegance to any outfit. Ideal for daily wear or special events.' },
        { id: 30, name: 'Silver Deer Heart Necklace', category: 'Jewellery', price: 84.00, oldPrice: 30.00, rating: 0, imageDefault: 'https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/8/9/89a5d46NK_GIVAX00000406_1.jpg',imageHover:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4mzUIZZTQ2aclFb4SfwHpzISVkqfF8QBGQ&s', description: 'Silver necklace with a delicate deer heart design. A symbol of grace and affection, perfect as a thoughtful gift.', reviews: [{ author: 'Fashionista F.', rating: 4, comment: 'Cute design, good for casual wear.' }] },
        { id: 31, name: 'Titan 100 Ml Womens Perfume', category: 'Perfume', price: 42.00, oldPrice: 10.00, rating: 0, imageDefault: 'https://m.media-amazon.com/images/I/61tqDHGFpfL._UF1000,1000_QL80_.jpg',imageHover:'https://images-static.nykaa.com/media/catalog/product/6/8/68a3891SKINN00000105_1.jpg', description: '100 ml women\'s perfume by Titan. A captivating fragrance that leaves a lasting impression, ideal for daily use.' },
        { id: 32, name: 'Men\'s Leather Reversible Belt', category: 'Belt', price: 24.00, oldPrice: 10.00, rating: 0, imageDefault: 'https://m.media-amazon.com/images/I/41okIKjUlsL._UY1100_.jpg', imageHover:'https://www.thewalletstore.in/cdn/shop/files/1._2.jpg?v=1698918186',description: 'Reversible leather belt for men. Offers two style options in one, perfect for versatile fashion needs.' },
        { id: 33, name: 'platinum Zircon Classic Ring', category: 'jewellery', price: 62.00, oldPrice: 65.00, rating: 0, imageDefault: 'https://m.media-amazon.com/images/I/61Rp1y4tTxL._UY300_.jpg', imageHover:'https://m.media-amazon.com/images/I/51L9UkPEH0L._UY1100_.jpg',description: 'Classic platinum zircon ring. A timeless piece of jewelry that adds sophistication to any hand.' },
        { id: 34, name: 'Smart Tv', category: 'Electronic', price: 56.00, oldPrice: 78.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkL8fnsxHV51sCNIlTX5ZXBI5uu7KPkCRh7Q&s',imageHover:'https://m.media-amazon.com/images/I/51lYbJhOmbL._UF1000,1000_QL80_.jpg', description: 'SmartTv with advanced vital features. Enjoy stunning visuals and smart connectivity for an immersive entertainment experience.' },
        { id: 35, name: 'School Bag', category: 'Bags', price: 20.00, oldPrice: 30.00, rating: 0, imageDefault: 'https://homafy.com/wp-content/uploads/2024/03/video-game-lover-bag.jpeg',imageHover:'https://m.media-amazon.com/images/I/618XjF2vf0L._UY1100_.jpg' ,description: 'Durable and spacious school bag. Perfect for carrying books and essentials with comfort and style.' },
        { id: 36, name: 'Rose Gold Peacock Earrings', category: 'jewellery', price: 20.00, oldPrice: 30.00, rating: 0, imageDefault: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1igHKQUH3fOW1pxKFs1Dk2JqSKOfU5nCTwA&s',imageHover:'https://img.tatacliq.com/images/i22//437Wx649H/MP000000025485772_437Wx649H_202502231638021.jpeg', description: 'Beautiful rose gold peacock earrings. An exquisite design that adds a touch of elegance and charm to your look.' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(true); // Always open on desktop
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoriesState, setSelectedCategoriesState] = useState([]);
    const [selectedBrandsState, setSelectedBrandsState] = useState([]);
    const [minPriceState, setMinPriceState] = useState('');
    const [maxPriceState, setMaxPriceState] = useState('');
    const [selectedRatingsState, setSelectedRatingsState] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product detail
    const [notification, setNotification] = useState('');
    // notificationCount and setNotificationCount are now received as props


    // Use local state for filters if not provided from props
    const effectiveSelectedCategories = selectedCategories.length ? selectedCategories : selectedCategoriesState;
    const effectiveSetSelectedCategories = setSelectedCategories || setSelectedCategoriesState;
    const effectiveSelectedBrands = selectedBrands.length ? selectedBrands : selectedBrandsState;
    const effectiveSetSelectedBrands = setSelectedBrands || setSelectedBrandsState;
    const effectiveMinPrice = minPrice || minPriceState;
    const effectiveSetMinPrice = setMinPrice || setMinPriceState;
    const effectiveMaxPrice = maxPrice || maxPriceState;
    const effectiveSetMaxPrice = setMaxPrice || setMaxPriceState;
    const effectiveSelectedRatings = selectedRatings.length ? selectedRatings : selectedRatingsState;
    const effectiveSetSelectedRatings = setSelectedRatings || setSelectedRatingsState;

    // Filtered products based on search and filters
    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = effectiveSelectedCategories.length === 0 || effectiveSelectedCategories.includes(product.category);
        const matchesBrand = effectiveSelectedBrands.length === 0 || !product.brand || effectiveSelectedBrands.includes(product.brand);
        const matchesPrice = (!effectiveMinPrice || product.price >= parseFloat(effectiveMinPrice)) && (!effectiveMaxPrice || product.price <= parseFloat(effectiveMaxPrice));
        const matchesRating = effectiveSelectedRatings.length === 0 || effectiveSelectedRatings.includes(Math.floor(product.rating));
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });

    // Separate products for different sections
    const newArrivals = allProducts.filter(p => typeof p.category === 'string' && ['Clothes', 'Mens Fashion', 'Winter wear', 'Shorts'].includes(p.category)).slice(0, 8);
    const trendingProducts = allProducts.filter(p => typeof p.category === 'string' && ['Sports', 'Party wear', 'boots', 'formal', 'Casual'].includes(p.category)).slice(0, 8);
    const topRatedProducts = allProducts.filter(p => typeof p.category === 'string' && ['Watches', 'Jewellery', 'Perfume', 'Belt', 'cosmetics'].includes(p.category)).slice(0, 8);
    const dealOfTheDayProduct = allProducts.find(p => p.id === 13); // Example: shampoo pack as deal of the day

    // Function to handle back from product detail view
    const handleBackToProducts = () => {
        setSelectedProduct(null);
    };

    // Function to handle add to cart with notification and counting
    const handleAddToCart = (product) => {
        if (typeof onAddToCart === 'function') {
            onAddToCart(product);
            if (typeof setNotificationCount === 'function') {
                setNotificationCount(prev => prev + 1);
            }
            setNotification(`${product.name} added to cart! (${notificationCount + 1})`);
            setTimeout(() => {
                setNotification('');
            }, 2000);
        }
    };

    return (
        <div className="product-container container mx-auto px-4 mt-8 h-[calc(100vh-4rem)]" id="products-section">
            {selectedProduct ? (
                // Display Product Detail View if a product is selected
                <ProductDetailView
                    product={selectedProduct}
                    onBack={handleBackToProducts}
                    onAddToCart={handleAddToCart}
                />
            ) : (
                // Display Product Listing if no product is selected
                <div className="flex flex-col md:flex-row gap-8 h-full">
                    {/* Left Side: Filter Section (independent scroll) */}
                    <div className="w-full md:w-64 flex flex-col gap-6 h-80 md:h-full md:max-h-full md:sticky md:top-16" style={{ minHeight: '20rem' }}>
                        <div className="h-full overflow-y-auto custom-scrollbar-light">
                            <FilterPane
                                isFilterPaneOpen={isFilterPaneOpen}
                                setIsFilterPaneOpen={setIsFilterPaneOpen}
                                selectedCategories={effectiveSelectedCategories}
                                setSelectedCategories={effectiveSetSelectedCategories}
                                selectedBrands={effectiveSelectedBrands}
                                setSelectedBrands={effectiveSetSelectedBrands}
                                minPrice={effectiveMinPrice}
                                setMinPrice={effectiveSetMinPrice}
                                maxPrice={effectiveMaxPrice}
                                setMaxPrice={effectiveSetMaxPrice}
                                selectedRatings={effectiveSelectedRatings}
                                setSelectedRatings={effectiveSetSelectedRatings}
                                products={allProducts}
                            />
                            {/* Search bar for products */}

                        </div>
                    </div>
                    {/* Right Side: Category Section at Top, then Products (independent scroll) */}
                    <div className="flex-1 flex flex-col gap-8 h-80 md:h-full md:max-h-full">
                        <div className="h-full overflow-y-auto pr-2 ">
                            <div className="sidebar-category mb-8">
                                <h2 className="title text-2xl font-bold text-purple-700 mb-6">Category</h2>
                                <ul className="sidebar-menu-category-list flex flex-wrap gap-2">
                                    {/* Dynamically generate categories based on products */}
                                    {[...new Set(allProducts.map(p => p.category).filter(Boolean))].sort().map(category => (
                                        <li key={category} className="sidebar-menu-category mb-2">
                                            <button
                                                className={`sidebar-accordion-menu py-2 px-3 rounded-md transition-colors ${selectedCategory === category ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                                onClick={() => setSelectedCategory(prev => prev === category ? null : category)}
                                            >
                                                <span className="menu-title font-medium">{category}</span>
                                                <span className="text-sm text-gray-500 ml-2">({allProducts.filter(p => p.category === category).length})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Product Content */}
                            <ProductMinimal title="New Arrivals" products={newArrivals} onQuickView={onQuickView} onAddToWishlist={onAddToWishlist} onCompare={onCompare} onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
                            <ProductMinimal title="Trending" products={trendingProducts} onQuickView={onQuickView} onAddToWishlist={onAddToWishlist} onCompare={onCompare} onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
                            <ProductFeatured product={dealOfTheDayProduct} onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
                            <ProductGrid title="All Products" products={filteredProducts} onQuickView={onQuickView} onAddToWishlist={onAddToWishlist} onCompare={onCompare} onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
                            <ProductMinimal title="Top Rated" products={topRatedProducts} onQuickView={onQuickView} onAddToWishlist={onAddToWishlist} onCompare={onCompare} onAddToCart={handleAddToCart} onProductClick={setSelectedProduct} />
                        </div>
                    </div>
                </div>
            )}
            {/* Cart Sidebar - Rendered here for full cart functionality */}
            <Cart
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                handleCheckout={handleCheckout}
                getTotalPrice={getTotalPrice}
            />
            {/* Custom CSS for scrollbar - removed horizontal scrollbar styles */}
            <style jsx="true">{` /* Added jsx="true" to resolve warning */
                /* Light theme scrollbar for sidebar only */
                .custom-scrollbar-light::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-track {
                    background: #e0e0e0; /* Light gray for track */
                    border-radius: 10px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-thumb {
                    background: #9c27b0; /* Purple for thumb */
                    border-radius: 10px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
                    background: #7b1fa2; /* Darker purple on hover */
                }

                /* Animation for ProductDetailView */
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-20 right-6 z-[100] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all animate-bounce flex items-center space-x-3">
                    <span>{notification}</span>
                </div>
            )}
        </div>
    );
};

export default ProductSection;
