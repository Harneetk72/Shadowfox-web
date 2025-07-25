import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroLogo from './hero_logo.png';
import AuthPage from '../pages/Login.jsx'; // Adjust the import path as needed

const HeroCarousel = () => {
    const heroImages = [
        {
            image: heroLogo,
            heading: "Discover the Best Deals on ",
            highlight: "Trendy Products",
            description: "Shop the latest in fashion, electronics, home essentials, and more. Enjoy fast delivery, secure checkout, and exclusive offers every day!",
            cta: "Shop Now",
            link: "/product"
        },
        {
            image: heroLogo,
            heading: "Upgrade Your Lifestyle with ",
            highlight: "Exclusive Collections",
            description: "Find unique products and limited-time offers. Make your shopping experience memorable with ShopEase!",
            cta: "Browse Collections",
            link: "/product"
        },
        {
            image: heroLogo,
            heading: "Fast, Reliable, and ",
            highlight: "Customer-Focused",
            description: "Enjoy 24/7 support, easy returns, and a community of happy shoppers. Your satisfaction is our priority!",
            cta: "Join Now",
            link: "/login",
            component: AuthPage // This will render the AuthPage component when the link is clicked
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const goToSlide = (index) => setCurrentSlide(index);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    return (
        <section className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-10 md:py-16 flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-[320px]">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${heroImages.length * 100}%` }}
            >
                {heroImages.map((slide, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
                        {/* Text Content */}
                        <div className="max-w-xl mb-10 md:mb-0 text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-6 drop-shadow-lg">
                                {slide.heading}
                                <span className="text-pink-500">{slide.highlight}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 mb-8">
                                {slide.description}
                            </p>
                            <Link
                                to={slide.link}
                                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-colors duration-300"
                            >
                                {slide.cta}
                            </Link>
                        </div>

                        {/* Hero Image */}
                        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
                            <img src={slide.image} alt="Shopping Hero" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-pink-200 text-purple-700 rounded-full p-3 shadow-lg z-20">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-pink-200 text-purple-700 rounded-full p-3 shadow-lg z-20">
                <i className="fas fa-chevron-right"></i>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {heroImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-4 h-4 rounded-full border-2 ${currentSlide === idx ? 'bg-pink-500 border-pink-500' : 'bg-white border-purple-300'} transition-all`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-2xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-200 rounded-full opacity-30 blur-2xl -z-10"></div>
        </section>
    );
};

export default HeroCarousel;
