import React, { useEffect } from 'react';

// Helper component for Ionicons
// This component ensures that the Ionicons script is loaded once
// when any component using IonIcon is mounted.
const IonIcon = ({ name, className = '' }) => {
    useEffect(() => {
        const scriptId = 'ionicons-script-footer'; // Unique ID to prevent multiple loads
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
    }, []); // Empty dependency array ensures this runs only once on mount

    return <ion-icon name={name} class={className}></ion-icon>;
};

/**
 * Footer Component for an E-commerce Website
 *
 * This component provides a responsive footer with:
 * - Company information (logo, description, contact details)
 * - Quick navigation links
 * - Product categories
 * - Social media links
 * - Placeholder for payment methods image
 * - Copyright information
 *
 * It uses Tailwind CSS for styling and Ionicons for icons.
 */
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 md:py-16 rounded-t-xl shadow-lg">
            <div className="container mx-auto px-4">
                {/* Footer Main Section - Grid layout for responsiveness */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* Column 1: Company Info */}
                    <div className="footer-col">
                        <div className="footer-brand mb-6">
                            {/* Company Logo and Name */}
                            <a href="#" className="flex items-center space-x-2 text-white text-3xl font-bold hover:text-purple-400 transition-colors">
                                <IonIcon name="bag-handle-outline" className="text-purple-500 text-4xl"></IonIcon>
                                <span>ShopEase</span>
                            </a>
                        </div>
                        {/* Company Description */}
                        <p className="text-sm leading-relaxed mb-4">
                            ShopEase is your one-stop online destination for all your shopping needs. We offer a wide range of high-quality products at competitive prices, ensuring a seamless and enjoyable shopping experience.
                        </p>
                        {/* Contact Information */}
                        <address className="text-sm not-italic">
                            <p className="flex items-center mb-2">
                                <IonIcon name="location-outline" className="text-purple-400 mr-2"></IonIcon>
                                123 E-commerce St, Suite 456, City, Country
                            </p>
                            <p className="flex items-center mb-2">
                                <IonIcon name="mail-outline" className="text-purple-400 mr-2"></IonIcon>
                                <a href="mailto:info@shopease.com" className="hover:text-purple-400 transition-colors">info@shopease.com</a>
                            </p>
                            <p className="flex items-center">
                                <IonIcon name="call-outline" className="text-purple-400 mr-2"></IonIcon>
                                <a href="tel:+1234567890" className="hover:text-purple-400 transition-colors">+1 (234) 567-890</a>
                            </p>
                        </address>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <h3 className="footer-heading text-xl font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">About Us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Contact Us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">FAQ</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Returns & Refunds</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div className="footer-col">
                        <h3 className="footer-heading text-xl font-semibold text-white mb-6">Categories</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Electronics</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Fashion</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Home & Kitchen</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Beauty & Personal Care</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Sports & Outdoors</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Books & Media</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media & Payment Methods */}
                    <div className="footer-col">
                        <h3 className="footer-heading text-xl font-semibold text-white mb-6">Follow Us</h3>
                        <div className="social-links flex space-x-4 mb-8">
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-2xl" aria-label="Facebook">
                                <IonIcon name="logo-facebook"></IonIcon>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-2xl" aria-label="Twitter">
                                <IonIcon name="logo-twitter"></IonIcon>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-2xl" aria-label="Instagram">
                                <IonIcon name="logo-instagram"></IonIcon>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-2xl" aria-label="LinkedIn">
                                <IonIcon name="logo-linkedin"></IonIcon>
                            </a>
                        </div>
                        {/* Payment Methods Image */}
                        <h3 className="footer-heading text-xl font-semibold text-white mb-4">Payment Methods</h3>
                        <img src="https://placehold.co/200x40/DDDDDD/666666?text=Payment+Methods" alt="Payment methods" className="w-full max-w-[200px] h-auto rounded-md" />
                    </div>

                </div>

                {/* Footer Bottom Section - Copyright */}
                <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
                    </p>
                    <p className="mt-1">
                        Designed with ❤️ by Your Company Name
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
