import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

// Helper component for Ionicons
const IonIcon = ({ name, className = '' }) => {
    // Dynamically load Ionicons script if not already present
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

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend server
        console.log('Form submitted:', formData);
        // Using a custom modal or toast for alerts instead of window.alert()
        // For this demo, we'll use a simple console log
        console.log('Thank you for your message! We will get back to you soon.');
        setFormData({ // Clear form after submission
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <>
        
           <div className="min-h-screen bg-gray-100 py-12">
            {/* Tailwind CSS CDN (included for standalone preview) */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Google Font: Poppins (from original HTML) */}
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10">Contact Us</h1>
                <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-12">
                    Have questions or need assistance? Reach out to us using the form below or through our contact details. We're here to help!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-purple-700 mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Regarding an order / Product inquiry / General feedback"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Type your message here..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
                            >
                                Send Message <IonIcon name="send-outline" className="ml-2 inline-block" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Information & Map */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-purple-700 mb-6">Our Contact Details</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-4">
                                    <IonIcon name="location-outline" className="text-purple-600 text-2xl flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Address:</h3>
                                        <address className="text-gray-700 not-italic">
                                            419 State 414 Rte, Beaver Dams,<br/>
                                            New York(NY), 14812, USA
                                        </address>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <IonIcon name="call-outline" className="text-purple-600 text-2xl flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Phone:</h3>
                                        <a href="tel:+607936-8058" className="text-gray-700 hover:text-pink-600 transition-colors">01628-64710</a>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <IonIcon name="mail-outline" className="text-purple-600 text-2xl flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email:</h3>
                                        <a href="mailto:info@anon.com" className="text-gray-700 hover:text-pink-600 transition-colors">shopease89@gmail.com</a>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <h3 className="font-semibold text-gray-900 mb-3">Follow Us:</h3>
                                <ul className="flex space-x-4">
                                    <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors"><IonIcon name="logo-facebook" className="text-3xl" /></a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-blue-400 transition-colors"><IonIcon name="logo-twitter" className="text-3xl" /></a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors"><IonIcon name="logo-instagram" className="text-3xl" /></a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors"><IonIcon name="logo-linkedin" className="text-3xl" /></a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Live Google Map Embedding */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <h2 className="text-3xl font-bold text-purple-700 p-8 pb-4">Our Location</h2>
                            <div className="w-full h-80">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.684074218765!2d-77.0368704845947!3d40.71277647933618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598c9e5b0b2b%3A0x6b7b2b2b2b2b2b2b!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1678888888888!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Our Store Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      
    );
};

export default ContactUsPage;
