/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart,
  Close,
  CheckCircle,
  Error,
  Add,
  Remove,
  Person,
  CreditCard,
  CheckCircleOutline,
  Warning,
} from "@mui/icons-material";

// Sample car data - expanded to 20 cars
const carsData = [
  {
    id: 1,
    name: "Tesla Model S",
    price: 79999,
    image:
      "https://ev-database.org/img/auto/Tesla_Model_S_2016/Tesla_Model_S_2016-01@2x.jpg",
    description: "Luxury electric sedan with autopilot features",
    specs: {
      range: "396 miles",
      topSpeed: "200 mph",
      acceleration: "0-60 in 2.3s",
      seating: "5 adults",
      charging: "250 kW max",
    },
  },
  {
    id: 2,
    name: "Porsche 911",
    price: 99999,
    image:
      "https://media.ed.edmunds-media.com/porsche/911/2025/oem/2025_porsche_911_coupe_carrera-4-gts_fq_oem_1_1280.jpg",
    description: "Iconic sports car with exceptional performance",
    specs: {
      range: "19 mpg",
      topSpeed: "191 mph",
      acceleration: "0-60 in 3.5s",
      seating: "4 adults",
      engine: "3.0L Twin-Turbo Flat-6",
    },
  },
  {
    id: 3,
    name: "Audi e-tron",
    price: 65900,
    image:
      "https://www.thecarexpert.co.uk/wp-content/uploads/2019/06/Audi-Q8-e-tron-2133x1200-cropped.jpg",
    description: "Premium electric SUV with quattro all-wheel drive",
    specs: {
      range: "222 miles",
      topSpeed: "124 mph",
      acceleration: "0-60 in 5.5s",
      seating: "5 adults",
      charging: "150 kW max",
    },
  },
  {
    id: 4,
    name: "BMW i8",
    price: 147500,
    image:
      "https://blog.bramanbmwjupiter.com/wp-content/uploads/2024/02/BMW-i8-Specs-.jpg",
    description: "Hybrid sports car with futuristic design",
    specs: {
      range: "18 miles electric + 330 miles total",
      topSpeed: "155 mph",
      acceleration: "0-60 in 4.2s",
      seating: "4 adults",
      engine: "1.5L Turbo + Electric Motor",
    },
  },
  {
    id: 5,
    name: "Ford Mustang Mach-E",
    price: 42995,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/2021_Ford_Mustang_Mach-E_Standard_Range_Front.jpg",
    description: "All-electric SUV with Mustang performance",
    specs: {
      range: "305 miles",
      topSpeed: "124 mph",
      acceleration: "0-60 in 3.5s (GT)",
      seating: "5 adults",
      charging: "150 kW max",
    },
  },
  {
    id: 6,
    name: "Lamborghini Huracan",
    price: 261274,
    image:
      "https://cdn.motor1.com/images/mgl/kNREB/s1/lamborghini-huracan-sto.jpg",
    description: "Exotic supercar with breathtaking performance",
    specs: {
      range: "13 mpg",
      topSpeed: "202 mph",
      acceleration: "0-60 in 2.5s",
      seating: "2 adults",
      engine: "5.2L V10",
    },
  },
  {
    id: 7,
    name: "Jeep Wrangler 4xe",
    price: 47995,
    image:
      "https://pictures.dealer.com/f/farrishdodgejeepcllc/0674/7acc2b5912d0bb24e7df3e91f2f506fdx.jpg?impolicy=downsize_bkpt&w=410",
    description: "Hybrid off-road capable SUV",
    specs: {
      range: "21 miles electric + 370 miles total",
      topSpeed: "112 mph",
      acceleration: "0-60 in 6.0s",
      seating: "5 adults",
      engine: "2.0L Turbo + Electric Motor",
    },
  },
  {
    id: 8,
    name: "Porsche Taycan",
    price: 82900,
    image:
      "https://www.topgear.com/sites/default/files/cars-car/image/2024/06/1-Porsche-Taycan-2024-UK-review.jpg?w=1280&h=720",
    description: "All-electric sports sedan with incredible performance",
    specs: {
      range: "227 miles",
      topSpeed: "161 mph",
      acceleration: "0-60 in 2.6s",
      seating: "4 adults",
      charging: "270 kW max",
    },
  },
  {
    id: 9,
    name: "Mercedes-Benz EQS",
    price: 102310,
    image:
      "https://www.topgear.com/sites/default/files/2023/07/Large-42763-EQSSUV.jpg",
    description: "Ultra-luxury electric sedan with hypersonic display",
    specs: {
      range: "350 miles",
      topSpeed: "130 mph",
      acceleration: "0-60 in 4.5s",
      seating: "5 adults",
      charging: "200 kW max",
    },
  },
  {
    id: 10,
    name: "Rivian R1T",
    price: 73500,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/2025-rivian-r1t-tri-motor-358-685c205bdbd5b.jpg?crop=0.756xw:0.567xh;0.168xw,0.389xh&resize=1200:*",
    description: "Adventure electric truck with impressive capabilities",
    specs: {
      range: "314 miles",
      topSpeed: "115 mph",
      acceleration: "0-60 in 3.0s",
      seating: "5 adults",
      charging: "200 kW max",
    },
  },
  {
    id: 11,
    name: "Ferrari SF90 Stradale",
    price: 625000,
    image:
      "https://f1rst-motors.s3.me-central-1.amazonaws.com/cars/1714734578935-ferrari_sf90_4007579941.jpeg",
    description: "Hybrid hypercar with F1 technology",
    specs: {
      range: "16 mpg",
      topSpeed: "211 mph",
      acceleration: "0-60 in 2.5s",
      seating: "2 adults",
      engine: "4.0L V8 + 3 Electric Motors",
    },
  },
  {
    id: 12,
    name: "Volkswagen ID.4",
    price: 41190,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/2020_Volkswagen_ID.4_Pro_%28Netherlands%29_front_view.jpg/1200px-2020_Volkswagen_ID.4_Pro_%28Netherlands%29_front_view.jpg",
    description: "Practical electric SUV for everyday use",
    specs: {
      range: "260 miles",
      topSpeed: "112 mph",
      acceleration: "0-60 in 7.6s",
      seating: "5 adults",
      charging: "125 kW max",
    },
  },
  {
    id: 13,
    name: "Aston Martin DB11",
    price: 205600,
    image:
      "https://imgd.aeplcdn.com/1920x1080/cw/ec/25539/Aston-Martin-DB11-Rear-view-82880.jpg?v=201711021421&q=80&q=80",
    description: "Grand tourer with exquisite British craftsmanship",
    specs: {
      range: "18 mpg",
      topSpeed: "208 mph",
      acceleration: "0-60 in 3.7s",
      seating: "4 adults",
      engine: "4.0L V8 or 5.2L V12",
    },
  },
  {
    id: 14,
    name: "Kia EV6",
    price: 40925,
    image:
      "https://imgcdn.zigwheels.ph/large/gallery/exterior/17/3024/kia-ev6-front-angle-low-view-290704.jpg",
    description: "Stylish electric crossover with fast charging",
    specs: {
      range: "310 miles",
      topSpeed: "115 mph",
      acceleration: "0-60 in 5.1s",
      seating: "5 adults",
      charging: "235 kW max",
    },
  },
  {
    id: 15,
    name: "McLaren 720S",
    price: 299000,
    image:
      "https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818c182b53bf8d6c75d11eb_McLaren%2520720S-Main_image_mobile-001.webp",
    description: "Supercar with dihedral doors and incredible aerodynamics",
    specs: {
      range: "16 mpg",
      topSpeed: "212 mph",
      acceleration: "0-60 in 2.8s",
      seating: "2 adults",
      engine: "4.0L Twin-Turbo V8",
    },
  },
  {
    id: 16,
    name: "Hyundai Ioniq 5",
    price: 39450,
    image:
      "https://mediacloud.carbuyer.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1739535855/autoexpress/2025/02/Hyundai%20Ioniq%205%20N%20Line%20S%202025-17.jpg",
    description: "Retro-futuristic electric crossover",
    specs: {
      range: "303 miles",
      topSpeed: "115 mph",
      acceleration: "0-60 in 5.2s",
      seating: "5 adults",
      charging: "220 kW max",
    },
  },
  {
    id: 17,
    name: "Rolls-Royce Ghost",
    price: 332500,
    image:
      "https://blackfoxmotors.de/wp-content/uploads/2024/10/394A0483-scaled.jpeg",
    description: "Ultra-luxury sedan with whisper-quiet ride",
    specs: {
      range: "16 mpg",
      topSpeed: "155 mph",
      acceleration: "0-60 in 4.6s",
      seating: "5 adults",
      engine: "6.75L V12",
    },
  },
  {
    id: 18,
    name: "Ford F-150 Lightning",
    price: 39974,
    image:
      "https://di-uploads-pod45.dealerinspire.com/donfranklinfordlondon/uploads/2024/11/2024-Ford-F-150-Lightning.jpg",
    description: "All-electric version of America's best-selling truck",
    specs: {
      range: "320 miles",
      topSpeed: "112 mph",
      acceleration: "0-60 in 4.5s",
      seating: "5 adults",
      charging: "150 kW max",
    },
  },
  {
    id: 19,
    name: "Nissan GT-R",
    price: 113540,
    image:
      "https://www.stratstone.com/-/media/stratstone/spotlight/nissan-gt-r-nismo/carousel/nissan-gtr-exterior-driving-1920x774px.ashx",
    description: "Legendary supercar with incredible performance",
    specs: {
      range: "18 mpg",
      topSpeed: "196 mph",
      acceleration: "0-60 in 2.9s",
      seating: "4 adults",
      engine: "3.8L Twin-Turbo V6",
    },
  },
  {
    id: 20,
    name: "Lucid Air",
    price: 77400,
    image:
      "https://www.ttnews.com/sites/default/files/styles/article_full_width_image/public/images/articles/lucid-air-exterior-1200.jpg",
    description: "Long-range luxury electric sedan",
    specs: {
      range: "520 miles",
      topSpeed: "168 mph",
      acceleration: "0-60 in 3.0s",
      seating: "5 adults",
      charging: "300 kW max",
    },
  },
];

export const Products = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const carsPerPage = 9;
  const totalPages = Math.ceil(carsData.length / carsPerPage);

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carsData.slice(indexOfFirstCar, indexOfLastCar);

  const openDetails = (car) => {
    setSelectedCar(car);
  };

  const closeDetails = () => {
    setSelectedCar(null);
  };

  const addToCart = (car) => {
    const existingItem = cart.find((item) => item.id === car.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...car, quantity: 1 }]);
    }
    toast.success(`${car.name} added to cart!`);
    setIsCartOpen(true);
    closeDetails();
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCheckoutStep(1);
  };

  const processPayment = () => {
    // Simulate payment processing
    const isSuccess = Math.random() > 0.3; // 70% success rate

    if (isSuccess) {
      setPaymentStatus("success");
      setCart([]);
      toast.success("Payment successful!");
    } else {
      setPaymentStatus("failed");
      toast.error("Payment failed. Please try again.");
    }
    setCheckoutStep(3);
  };

  const resetCheckout = () => {
    setCheckoutStep(0);
    setPaymentStatus(null);
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
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full bg-gradient-to-l from-gray-50 to-white text-black mt-4 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Premium Cars Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCars.map((car) => (
          <motion.div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => openDetails(car)}
          >
            <img
              src={car.image}
              alt=''
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {car.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl text-green-400 font-bold">
                  ${car.price.toLocaleString()}
                </span>
                <button
                  className="bg-gradient-to-l from-blue-400 to-violet-200 text-white px-4 py-2 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(car);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-gradient-to-l from-red-400 to-orange-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetails}
          >
            <motion.div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  className="absolute top-4 right-4 bg-gradient-to-l from-red-600 to-orange-500 text-white rounded-full p-1 shadow-md"
                  onClick={closeDetails}
                >
                  <Close />
                </button>
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold">{selectedCar.name}</h2>
                <p className="text-gray-600 mt-2">{selectedCar.description}</p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedCar.specs).map(([key, value]) => (
                      <div key={key} className="bg-gray-100 p-3 rounded-lg">
                        <span className="font-medium text-black">{key}: </span>
                        <span className="text-blue-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <span className="text-3xl text-green-400 font-bold">
                    ${selectedCar.price.toLocaleString()}
                  </span>
                  <button
                    className="bg-gradient-to-l from-blue-400 to-indigo-500 text-white px-6 py-3 rounded-lgflex items-center"
                    onClick={() => addToCart(selectedCar)}
                  >
                    <ShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <button className="bg-gradient-to-l from-red-600 to-red-700 text-white" onClick={() => setIsCartOpen(false)}>
                    <Close />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 text-black">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b pb-4"
                        >
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="ml-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-gray-600">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <button
                              className="bg-gradient-to-l from-red-400 to-orange-500 text-white"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Remove />
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              className="bg-gradient-to-l from-blue-400 to-violet-500 text-white"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Add />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <div className="flex text-black justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-green-300">${getTotalPrice().toLocaleString()}</span>
                      </div>

                      <button
                        className="w-full bg-gradient-to-l from-blue-400 to-violet-300 text-white py-3 rounded-lg mt-6 "
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
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
                  className="text-2xl hover:text-orange-500 transition-colors"
                >
                  <Close />
                </button>
              </div>

              <div className="p-6 text-black">
                {/* Checkout Progress */}
                <div className="flex justify-between mb-8 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        checkoutStep >= 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Person />
                    </div>
                    <span className="text-sm mt-2">Information</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        checkoutStep >= 2
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <CreditCard />
                    </div>
                    <span className="text-sm mt-2">Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        checkoutStep >= 3
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <CheckCircleOutline />
                    </div>
                    <span className="text-sm mt-2">Confirmation</span>
                  </div>
                  <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 -z-10">
                    <div
                      className="h-1 bg-blue-600 transition-all duration-300"
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
                  <div className="space-y-4 text-black">
                    <div>
                      <label htmlFor="name" className="block font-medium mb-2">
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
                      <label htmlFor="email" className="block font-medium mb-2">
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
                      <label htmlFor="phone" className="block font-medium mb-2">
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
                      className="w-full bg-gradient-to-l from-blue-300 to-indigo-400 py-3 rounded-md font-bold hover:from-blue-400 hover:to-indigo-500 transition-colors mt-4"
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
                        <label htmlFor="cvv" className="block font-medium mb-2">
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
                      className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors mt-4"
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
                        <CheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
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
                            Total: ${getTotalPrice().toLocaleString()}
                          </p>
                          <p className="text-gray-600">
                            Expected Delivery:{" "}
                            {new Date(
                              Date.now() + 7 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
                          onClick={resetCheckout}
                        >
                          Continue Shopping
                        </button>
                      </>
                    ) : (
                      <>
                        <Error className="text-6xl text-red-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Payment Failed
                        </h3>
                        <p className="text-gray-600 mb-6">
                          There was an issue processing your payment. Please try
                          again.
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button
                            className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-300 transition-colors"
                            onClick={() => setCheckoutStep(2)}
                          >
                            Try Again
                          </button>
                          <button
                            className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
