import React from 'react';

const FilterPane = ({ 
    isFilterPaneOpen, 
    setIsFilterPaneOpen, 
    selectedCategories, 
    setSelectedCategories, 
    selectedBrands, 
    setSelectedBrands, 
    minPrice, 
    setMinPrice, 
    maxPrice, 
    setMaxPrice, 
    selectedRatings, 
    setSelectedRatings,
    products = [] // Default to empty array
}) => {
    const allCategories = [...new Set(products.map(p => p.category))].sort();
    const allBrands = [...new Set(products.map(p => p.brand))].sort();
    const ratingOptions = [5, 4, 3, 2, 1];

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMinPrice('');
        setMaxPrice('');
        setSelectedRatings([]);
    };

    return (
        <div
            className={`
                bg-gray-50 shadow-2xl p-6 flex flex-col overflow-y-auto custom-scrollbar-light
                w-full md:w-64
                md:static md:top-auto md:left-auto md:h-auto md:z-auto md:translate-x-0 md:transition-none
                fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 transition-transform duration-300 ease-in-out
                ${isFilterPaneOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-pink-600">Filters</h3>
                {/* Show close button only on mobile */}
                <button
                    onClick={() => setIsFilterPaneOpen(false)}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 focus:outline-none md:hidden"
                >
                    <i className="fas fa-times text-2xl"></i>
                </button>
            </div>
            <button
                onClick={resetFilters}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-6 transition-colors duration-300 shadow-md"
            >
                Reset Filters
            </button>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Categories</h4>
                <div className="flex flex-col gap-2">
                    {allCategories.map((category) => (
                        <label key={category} className="inline-flex items-center text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-purple-600 bg-gray-200 border-gray-400 rounded focus:ring-purple-500"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <span className="ml-2">{category}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Brands</h4>
                <div className="flex flex-col gap-2">
                    {allBrands.map((brand) => (
                        <label key={brand} className="inline-flex items-center text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-purple-600 bg-gray-200 border-gray-400 rounded focus:ring-purple-500"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                            />
                            <span className="ml-2">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Price Range</h4>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 p-2 rounded-md bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 p-2 rounded-md bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Minimum Rating</h4>
                <div className="flex flex-col gap-2">
                    {ratingOptions.map((rating) => (
                        <label key={rating} className="inline-flex items-center text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-purple-600 bg-gray-200 border-gray-400 rounded focus:ring-purple-500"
                                checked={selectedRatings.includes(rating)}
                                onChange={() => handleRatingChange(rating)}
                            />
                            <span className="ml-2">{rating} Star{rating !== 1 ? 's' : ''} & Up</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPane;
