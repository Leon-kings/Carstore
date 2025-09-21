/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaCheckCircle,
  FaExclamationCircle,
  FaStar,
  FaGasPump,
  FaTachometerAlt,
  FaCog,
  FaUser,
  FaCreditCard,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const CarSearch = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'failed'

  // Sample car data
  const cars = [
    {
      id: 1,
      make: "BMW",
      model: "M8 Competition",
      year: 2023,
      price: 130000,
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description:
        "The BMW M8 Competition combines luxury with extreme performance, featuring a 4.4L V8 engine producing 617 horsepower.",
      features: [
        "4.4L V8 Engine",
        "617 HP",
        "0-60 mph in 3.0s",
        "Carbon Fiber Roof",
        "M Sport Differential",
      ],
      mileage: 15,
      transmission: "Automatic",
      fuelType: "Premium Gasoline",
      rating: 4.8,
      reviews: 142,
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "S-Class",
      year: 2023,
      price: 115000,
      image:
        "https://images.unsplash.com/photo-1563720223880-4d93eef1f0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description:
        "The Mercedes-Benz S-Class sets the standard for luxury sedans with cutting-edge technology and unparalleled comfort.",
      features: [
        "3.0L Inline-6 Hybrid",
        "429 HP",
        "MBUX Hyperscreen",
        "Rear-Wheel Steering",
        "E-Active Body Control",
      ],
      mileage: 22,
      transmission: "Automatic",
      fuelType: "Premium Gasoline",
      rating: 4.9,
      reviews: 189,
    },
    {
      id: 3,
      make: "Audi",
      model: "RS7 Sportback",
      year: 2023,
      price: 120000,
      image:
        "https://images.unsplash.com/photo-1606152536277-5aa1fd33e250?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description:
        "The Audi RS7 Sportback combines sleek design with explosive performance, featuring a twin-turbo V8 engine.",
      features: [
        "4.0L Twin-Turbo V8",
        "591 HP",
        "Quattro All-Wheel Drive",
        "Adaptive Air Suspension",
        "RS Sport Exhaust",
      ],
      mileage: 18,
      transmission: "Automatic",
      fuelType: "Premium Gasoline",
      rating: 4.7,
      reviews: 126,
    },
    {
      id: 4,
      make: "Porsche",
      model: "911 Turbo S",
      year: 2023,
      price: 215000,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description:
        "The Porsche 911 Turbo S is the pinnacle of performance and engineering, delivering breathtaking acceleration and precision handling.",
      features: [
        "3.8L Twin-Turbo Flat-6",
        "640 HP",
        "0-60 mph in 2.6s",
        "PDK Transmission",
        "Porsche Traction Management",
      ],
      mileage: 12,
      transmission: "Automatic",
      fuelType: "Premium Gasoline",
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 5,
      make: "Tesla",
      model: "Model S Plaid",
      year: 2023,
      price: 110000,
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description:
        "The Tesla Model S Plaid redefines electric performance with unprecedented acceleration and cutting-edge technology.",
      features: [
        "Tri-Motor Setup",
        "1020 HP",
        "0-60 mph in 1.99s",
        "390-mile Range",
        "Yoke Steering",
      ],
      mileage: 120, // MPGe equivalent
      transmission: "Single-Speed",
      fuelType: "Electric",
      rating: 4.8,
      reviews: 167,
    },
    {
      id: 6,
      make: "Lamborghini",
      model: "Huracán",
      year: 2023,
      price: 260000,
      image:
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description:
        "The Lamborghini Huracán delivers an exhilarating supercar experience with stunning design and explosive performance.",
      features: [
        "5.2L V10 Engine",
        "631 HP",
        "0-60 mph in 2.5s",
        "All-Wheel Drive",
        "Magnetic Suspension",
      ],
      mileage: 14,
      transmission: "Automatic",
      fuelType: "Premium Gasoline",
      rating: 4.9,
      reviews: 178,
    },
  ];

  // Filter cars based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCars(cars);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = cars.filter(
        (car) =>
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query) ||
          car.features.some((feature) => feature.toLowerCase().includes(query))
      );
      setFilteredCars(filtered);
    }
  }, [searchQuery]);

  // Handle search button click
  const handleSearch = () => {
    if (filteredCars.length > 0) {
      // Show the first car in the search results
      setSelectedCar(filteredCars[0]);
    }
  };

  // Add to cart function
  const addToCart = (car) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === car.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...car, quantity: 1 }];
      }
    });
    // Automatically open the cart modal
    setIsCartOpen(true);
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Simulate payment process
  const processPayment = () => {
    // Simulate API call with random success/failure
    const isSuccess = Math.random() > 0.3;
    setPaymentStatus(isSuccess ? "success" : "failed");
  };

  // Reset checkout process
  const resetCheckout = () => {
    setCheckoutStep(0);
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setPaymentInfo({
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
    });
    setPaymentStatus(null);
    if (paymentStatus === "success") {
      setCart([]);
      setIsCartOpen(false);
    }
  };

  return (
    <>
      <div className=" bg-gray-50  mt-4 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Luxury Car Collection
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover our exclusive selection of premium vehicles from the
              world's most prestigious manufacturers.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative text-black flex">
                <input
                  type="text"
                  placeholder="Search by make, model, or feature..."
                  className="w-full p-4 pl-12 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-300 to-orange-300"
                    onClick={() => setSearchQuery("")}
                  >
                    <FaTimes />
                  </button>
                )}
                <button
                  className="ml-2 bg-gradient-to-r from-blue-400 to-indigo-400 px-6 rounded-lg font-bold hover:bg-orange-700 transition-colors"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </motion.div>
          </div>

          {/* No Results Message */}
          {filteredCars.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No cars found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse our entire collection.
              </p>
            </div>
          )}
        </div>

        {/* Car Detail Modal */}
        <AnimatePresence>
          {selectedCar && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {selectedCar.make} {selectedCar.model}
                  </h2>
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="text-2xl bg-gradient-to-r from-red-400 to-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="w-full lg:w-1/2">
                      <div className="h-80 bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={selectedCar.image}
                          alt={`${selectedCar.make} ${selectedCar.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedCar.make} {selectedCar.model}
                      </h3>
                      <p className="text-2xl text-orange-600 mb-4">
                        ${selectedCar.price.toLocaleString()}
                      </p>

                      <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 mr-2">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar className="text-gray-300" />
                        </div>
                        <span className="text-gray-600">
                          {selectedCar.rating} ({selectedCar.reviews} reviews)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <FaTachometerAlt className="text-orange-600 mr-2" />
                          <span className="text-gray-600">
                            {selectedCar.mileage}{" "}
                            {selectedCar.fuelType === "Electric"
                              ? "MPGe"
                              : "MPG"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaCog className="text-orange-600 mr-2" />
                          <span className="text-gray-600">
                            {selectedCar.transmission}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaGasPump className="text-orange-600 mr-2" />
                          <span className="text-gray-600">
                            {selectedCar.fuelType}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-orange-600 mr-2" />
                          <span className="text-gray-600">Available Now</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {selectedCar.description}
                      </p>

                      <button
                        className="w-full bg-gradient-to-l from-indigo-400 to-blue-400 text-white py-3 rounded-md font-bold transition-colors mb-4"
                        onClick={() => {
                          addToCart(selectedCar);
                          setSelectedCar(null);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedCar.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Shopping Cart Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-2xl bg-gradient-to-l from-red-400 to-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <FaShoppingCart className="text-5xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Start adding some luxury vehicles to your cart!
                      </p>
                      <button
                        className="bg-gradient-to-l from-blue-400 to-violet-400 text-white py-2 px-6 rounded-md font-medium hover:bg-orange-700 transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6 mb-8">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col md:flex-row items-center border-b border-gray-200 pb-6"
                          >
                            <div className="w-full md:w-1/4 mb-4 md:mb-0">
                              <img
                                src={item.image}
                                alt={`${item.make} ${item.model}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                            <div className="w-full md:w-2/4 px-0 md:px-6 mb-4 md:mb-0">
                              <h3 className="text-xl font-bold text-gray-900">
                                {item.make} {item.model}
                              </h3>
                              <p className="text-gray-600">
                                {item.year} • {item.mileage}{" "}
                                {item.fuelType === "Electric" ? "MPGe" : "MPG"}
                              </p>
                              <p className="text-lg font-bold text-orange-600">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="w-full md:w-1/4 flex items-center justify-between">
                              <div className="flex items-center">
                                <button
                                  className="bg-gradient-to-l from-orange-300 to-red-200 text-gray-700 p-2 rounded-l-md"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <FaMinus />
                                </button>
                                <span className="bg-gray-100 px-4 py-2">
                                  {item.quantity}
                                </span>
                                <button
                                  className="bg-gradient-to-r from-blue-400 to-indigo-300 text-gray-700 p-2 rounded-r-md"
                                  onClick={() => addToCart(item)}
                                >
                                  <FaPlus />
                                </button>
                              </div>
                              <button
                                className="bg-gradient-to-l from-red-400 to-red-500 text-white ml-4"
                                onClick={() =>
                                  setCart(cart.filter((i) => i.id !== item.id))
                                }
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Subtotal</span>
                          <span className="text-gray-900 font-bold">
                            ${totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Tax (7.5%)</span>
                          <span className="text-gray-900 font-bold">
                            $
                            {(totalPrice * 0.075).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Delivery Fee</span>
                          <span className="text-gray-900 font-bold">
                            $500.00
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <span className="text-xl font-bold text-gray-900">
                            Total
                          </span>
                          <span className="text-xl font-bold text-orange-600">
                            $
                            {(
                              totalPrice +
                              totalPrice * 0.075 +
                              500
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>

                      <button
                        className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                        onClick={() => {
                          setIsCartOpen(false);
                          setCheckoutStep(1);
                        }}
                      >
                        Proceed to Checkout
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Checkout Modal */}
        <AnimatePresence>
          {checkoutStep > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {checkoutStep === 1 && "Customer Information"}
                    {checkoutStep === 2 && "Payment Details"}
                    {checkoutStep === 3 && "Order Summary"}
                  </h2>
                  <button
                    onClick={resetCheckout}
                    className="text-2xl bg-gradient-to-l from-red-400 to-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="p-6 text-black">
                  {/* Checkout Progress */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          checkoutStep >= 1
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <FaUser />
                      </div>
                      <span className="text-sm mt-2">Information</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          checkoutStep >= 2
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <FaCreditCard />
                      </div>
                      <span className="text-sm mt-2">Payment</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          checkoutStep >= 3
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <FaCheckCircle />
                      </div>
                      <span className="text-sm mt-2">Confirmation</span>
                    </div>
                    <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 -z-10">
                      <div
                        className="h-1 bg-orange-600 transition-all duration-300"
                        style={{
                          width:
                            checkoutStep === 1
                              ? "0%"
                              : checkoutStep === 2
                              ? "50%"
                              : "100%",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Step 1: Customer Information */}
                  {checkoutStep === 1 && (
                    <div className="space-y-4 text-black overflow-y-auto">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-medium mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={customerInfo.name}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={customerInfo.email}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              email: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-medium mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={customerInfo.phone}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              phone: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block font-medium mb-2"
                        >
                          Delivery Address
                        </label>
                        <textarea
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                          rows="3"
                          placeholder="Enter your delivery address"
                        />
                      </div>
                      <button
                        className="w-full bg-gradient-to-l from-violet-300 to-indigo-400 py-3 rounded-md font-bold hover:bg-orange-700 transition-colors mt-4"
                        onClick={() => setCheckoutStep(2)}
                      >
                        Continue to Payment
                      </button>
                    </div>
                  )}

                  {/* Step 2: Payment Information */}
                  {checkoutStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block font-medium mb-2"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiry"
                            className="block font-medium mb-2"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            value={paymentInfo.expiry}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                expiry: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cvv"
                            className="block font-medium mb-2"
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="nameOnCard"
                          className="block font-medium mb-2"
                        >
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              nameOnCard: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="Enter name as shown on card"
                        />
                      </div>
                      <button
                        className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors mt-4"
                        onClick={() => {
                          setCheckoutStep(3);
                          processPayment();
                        }}
                      >
                        Complete Payment
                      </button>
                    </div>
                  )}

                  {/* Step 3: Payment Result */}
                  {checkoutStep === 3 && (
                    <div className="text-center py-8">
                      {paymentStatus === "success" ? (
                        <>
                          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Payment Successful!
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Thank you for your purchase. Your order has been
                            confirmed.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                            <h4 className="font-bold text-gray-900 mb-2">
                              Order Details
                            </h4>
                            <p className="text-gray-600">
                              Order #:{" "}
                              {Math.floor(100000 + Math.random() * 900000)}
                            </p>
                            <p className="text-gray-600">
                              Total: $
                              {(
                                totalPrice +
                                totalPrice * 0.075 +
                                500
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                            <p className="text-gray-600">
                              Expected Delivery:{" "}
                              {new Date(
                                Date.now() + 7 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-2 px-6 rounded-md font-medium hover:bg-orange-700 transition-colors"
                            onClick={resetCheckout}
                          >
                            Continue Shopping
                          </button>
                        </>
                      ) : (
                        <>
                          <FaExclamationCircle className="text-6xl text-red-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Payment Failed
                          </h3>
                          <p className="text-gray-600 mb-6">
                            There was an issue processing your payment. Please
                            try again.
                          </p>
                          <div className="flex justify-center space-x-4">
                            <button
                              className="bg-gradient-to-l from-red-300 to-orange-300 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-300 transition-colors"
                              onClick={() => setCheckoutStep(2)}
                            >
                              Try Again
                            </button>
                            <button
                              className="bg-gradient-to-l from-violet-400 to-indigo-400 text-white py-2 px-6 rounded-md font-medium hover:bg-orange-700 transition-colors"
                              onClick={resetCheckout}
                            >
                              Continue Shopping
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
