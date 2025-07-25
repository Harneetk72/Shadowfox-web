import React from 'react';
import logo from '../Components/logo.png';

const IonIcon = ({ name, className = '' }) => {
    React.useEffect(() => {
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

const AboutUsSection = (props) => {
    return (
      <>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12">
              About Our Shop
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
              {/* Left Column: Image */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="rounded-xl shadow-xl w-32 h-32 object-contain mx-auto"
                />
              </div>

              {/* Right Column: Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Welcome to{" "}
                  <span className="font-bold text-pink-600">Anon</span>, your
                  premier destination for high-quality products and an
                  unparalleled shopping experience. We are passionate about
                  bringing you the latest trends and essential items across
                  various categories, all while ensuring exceptional value and
                  service.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Our mission is to simplify your shopping journey, offering a
                  seamless and enjoyable platform where you can discover unique
                  products, benefit from competitive prices, and receive your
                  orders with speed and care. We believe in building lasting
                  relationships with our customers by prioritizing trust,
                  transparency, and satisfaction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <IonIcon
                      name="cube-outline"
                      className="text-purple-600 text-3xl"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Wide Selection
                      </h3>
                      <p className="text-sm text-gray-600">
                        Thousands of products to choose from.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <IonIcon
                      name="wallet-outline"
                      className="text-purple-600 text-3xl"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Best Prices
                      </h3>
                      <p className="text-sm text-gray-600">
                        Unbeatable deals and discounts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <IonIcon
                      name="shield-checkmark-outline"
                      className="text-purple-600 text-3xl"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Secure Shopping
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your data and payments are safe.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <IonIcon
                      name="headset-outline"
                      className="text-purple-600 text-3xl"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        24/7 Support
                      </h3>
                      <p className="text-sm text-gray-600">
                        Always here to help you.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  } // Example: scroll to top or another section
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  Start Shopping Today{" "}
                  <IonIcon
                    name="arrow-forward-outline"
                    className="ml-2 inline-block"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Custom CSS for animations if needed, or rely on global styles */}
          <style jsx>{`
            /* Add any specific animations or overrides here if necessary */
          `}</style>
        </section>
      </>
    );
};

export default AboutUsSection;
