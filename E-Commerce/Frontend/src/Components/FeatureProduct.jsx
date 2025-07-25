import React from 'react';

const FeatureProduct = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-16 px-4 flex flex-col items-center text-center w-full">
      <h2 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-4">Your Shopping Journey</h2>
      <p className="max-w-6xl text-xl text-gray-700 mb-10">
        Experience a seamless and joyful shopping adventure with ShopEase. From browsing to delivery, we make every step delightful! Enjoy exclusive deals, fast shipping, and a community of happy shoppers across India.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-16 w-full max-w-7xl mb-14">
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2 text-purple-500">
            <i className="fas fa-search"></i>
          </span>
          <span className="font-semibold text-gray-700 text-lg">Browse</span>
          <span className="text-base text-gray-500">Find your favorites</span>
        </div>
        <span className="hidden md:block text-4xl text-gray-400">→</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2 text-pink-500">
            <i className="fas fa-shopping-bag"></i>
          </span>
          <span className="font-semibold text-gray-700 text-lg">Order</span>
          <span className="text-base text-gray-500">Easy & secure checkout</span>
        </div>
        <span className="hidden md:block text-4xl text-gray-400">→</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-2 text-yellow-500">
            <i className="fas fa-box-open"></i>
          </span>
          <span className="font-semibold text-gray-700 text-lg">Unbox</span>
          <span className="text-base text-gray-500">Fast doorstep delivery</span>
        </div>
      </div>
      {/* Fun facts row */}
      <div className="flex flex-wrap justify-center gap-12 w-full max-w-6xl mb-12">
        <div className="flex flex-col items-center">
          <span className="text-3xl text-green-500 font-bold">10K+</span>
          <span className="text-gray-600">Happy Customers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl text-blue-500 font-bold">24h</span>
          <span className="text-gray-600">Avg. Delivery Time</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl text-pink-500 font-bold">99%</span>
          <span className="text-gray-600">Positive Feedback</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl text-yellow-500 font-bold">500+</span>
          <span className="text-gray-600">Brands Available</span>
        </div>
      </div>
      {/* Testimonials */}
      <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-6xl mb-8">
        <blockquote className="italic text-lg text-gray-600 max-w-md mx-auto border-l-4 border-pink-400 pl-6 mb-6 md:mb-0">
          “I love how simple and fun shopping is here. My order arrived in just two days!”
          <br />
          <span className="block mt-2 font-bold text-pink-600">— Aarav M., Delhi</span>
        </blockquote>
        <blockquote className="italic text-lg text-gray-600 max-w-md mx-auto border-l-4 border-purple-400 pl-6">
          “The deals are amazing and the support team helped me instantly. Highly recommended!”
          <br />
          <span className="block mt-2 font-bold text-purple-600">— Sneha R., Pune</span>
        </blockquote>
      </div>
      <button className="mt-6 px-10 py-4 bg-pink-600 hover:bg-pink-700 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300">
        Explore Now
      </button>
    </section>
  );
};

export default FeatureProduct;
