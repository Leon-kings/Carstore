/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Close, LocalGasStation, Power, PowerInput, Speed } from "@mui/icons-material";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  // Car data
  const carData = {
    "bmw-m8": {
      name: "BMW M8 Competition",
      price: "$133,000",
      topSpeed: "190 mph",
      acceleration: "3.0 seconds",
      fuelEconomy: "17 mpg",
      horsepower: "617 hp",
      description:
        "The BMW M8 Competition combines breathtaking performance with luxurious comfort. With its 4.4-liter V8 engine producing 617 horsepower, this grand tourer delivers exhilarating acceleration and precise handling. The meticulously crafted interior features premium materials, advanced technology, and exceptional attention to detail.",
      image:
        "https://www.topgear.com/sites/default/files/cars-car/image/2019/10/bmw_m8_coupe_fire_red_033.jpg",
    },
    "mercedes-s": {
      name: "Mercedes-Benz S-Class",
      price: "$111,000",
      topSpeed: "155 mph",
      acceleration: "4.5 seconds",
      fuelEconomy: "23 mpg",
      horsepower: "496 hp",
      description:
        "The Mercedes-Benz S-Class represents the pinnacle of automotive luxury and innovation. With its cutting-edge technology, exquisite craftsmanship, and serene ride quality, the S-Class sets the standard for luxury sedans. The interior is a masterpiece of design, featuring premium materials and advanced comfort systems.",
      image:
        "https://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/1-mercedes-benz-s-class-2022-road-test-review-tracking-front.jpg",
    },
    "audi-rs7": {
      name: "Audi RS7 Sportback",
      price: "$115,000",
      topSpeed: "190 mph",
      acceleration: "3.5 seconds",
      fuelEconomy: "18 mpg",
      horsepower: "591 hp",
      description:
        "The Audi RS7 Sportback blends stunning design with explosive performance. Its 4.0-liter twin-turbo V8 engine delivers 591 horsepower, propelling this luxury sportback from 0-60 mph in just 3.5 seconds. The sleek exterior design is complemented by a high-tech interior with premium materials and advanced infotainment systems.",
      image:
        "https://darwinproaero.com/cdn/shop/files/DarwinPROAudiRS7C8iMPsideskirts8377IMP_12_1000x1000.jpg?v=1753670367",
    },
    
  };

  // Brands we serve
  const brands = [
    {
      name: "BMW",
      logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
    },
    {
      name: "Mercedes-Benz",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxGUF4Hiqu8RYQxl8Gr0mC2SckYKToOA4eBw&s",
    },
    {
      name: "Audi",
      logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png",
    },
    {
      name: "Porsche",
      logo: "https://download.logo.wine/logo/Porsche/Porsche-Logo.wine.png",
    },
    {
      name: "Lamborghini",
      logo: "https://logos-world.net/wp-content/uploads/2021/03/Lamborghini-Emblem.png",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    },
    {
      name: "Ferrari",
      logo: "https://www.carlogos.org/car-logos/ferrari-logo.png",
    },
    {
      name: "Bentley",
      logo: "https://pngimg.com/d/bentley_PNG21.png",
    },
  ];

  // Slideshow data
  const slides = [
    {
      id: "bmw-m8",
      image:
        "https://www.topgear.com/sites/default/files/cars-car/image/2019/10/bmw_m8_coupe_fire_red_033.jpg",
      title: "BMW M8 Competition",
      description:
        "Experience the ultimate in luxury and performance with the powerful BMW M8 Competition Coupe",
    },
    {
      id: "mercedes-s",
      image:
        "https://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/1-mercedes-benz-s-class-2022-road-test-review-tracking-front.jpg",
      title: "Mercedes-Benz S-Class",
      description:
        "Step into the future of automotive luxury with the innovative Mercedes-Benz S-Class",
    },
    {
      id: "audi-rs7",
      image:
        "https://darwinproaero.com/cdn/shop/files/DarwinPROAudiRS7C8iMPsideskirts8377IMP_12_1000x1000.jpg?v=1753670367",
      title: "Audi RS7 Sportback",
      description:
        "Unleash the power of the Audi RS7 Sportback - where performance meets elegance",
    },
        {
      id: "bugatti-chiron-profilee",
      image:
        "https://www.thedrive.com/wp-content/uploads/2022/12/21/bugatti-profilee-lead-image.jpg?quality=85",
      title: "Bugatti Chiron Profilée",
      description:
        "Unleash the power of the Bugatti Chiron Profilée - where performance meets elegance",
    },
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application, you would send the form data to your backend
      // await axios.post('/api/contact', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Thank you for your message! We will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
      setContactModalOpen(false);
    } catch (error) {
      toast.error("There was an error sending your message. Please try again.");
    }
  };

  // Open car details modal
  const openCarModal = (carId) => {
    setSelectedCar(carData[carId]);
    setCarModalOpen(true);
  };

  // Open contact modal from car modal
  const openContactFromCarModal = () => {
    setCarModalOpen(false);
    setContactModalOpen(true);
  };

  // Material Icon component
  const MaterialIcon = ({ icon, className = "" }) => (
    <span className={`material-icons ${className}`}>{icon}</span>
  );

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 text-gray-800 overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-2 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Car Slideshow */}
          <div className="relative h-screen md:h-screen rounded-xl overflow-hidden shadow-lg mb-8">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className={`absolute inset-0 bg-cover bg-center grid items-center ${
                  index === currentSlide ? "z-10" : "z-0"
                }`}
                style={{ backgroundImage: `url(${slide.image})`,objectFit: `cover` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
              >
                {" "}
                <div className="bg-opacity-70 justify-items-center text-white p-6 w-full ">
                  <h1 className="text-3xl md:text-4xl text-amber-200 font-bold italic mb-4">
                    Discover Your Dream Car
                  </h1>

                  <h2 className="text-2xl mt-4 md:text-3xl text-blue-400 font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="mb-4 text-blue-300">{slide.description}</p>
                </div>
                <div className="w-full items-center gap-6 justify-center space-y-3">
                  <button
                    onClick={() => openCarModal(slide.id)}
                    className="  bg-gradient-to-l from-indigo-400 to-violet-400 py-2 px-4 rounded-md  transition-colors"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className=" py-2 px-4 rounded-md bg-gradient-to-r from-blue-400 to-indigo-400 transition-colors"
                  >
                    Contact Us
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Brands We Serve Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Brands We Serve
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={brand.logo}
                    alt=""
                    className="max-h-12 max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <AnimatePresence>
          {contactModalOpen && (
            <div className="fixed inset-0 bg-black overflow-y-auto bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white mt-12 rounded-xl overflow-y-auto w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="flex mt-12 justify-between p-4">
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                  <button
                    onClick={() => setContactModalOpen(false)}
                    className="text-2xl right-0 bg-gradient-to-l from-red-400 to-red-500 transition-colors"
                  >
                    <Close />
                  </button>
                </div>

                <div className="p-6">
                  <form
                    onSubmit={handleSubmit}
                    className="text-black overflow-y-auto"
                  >
                    <div className="mb-4">
                      <label htmlFor="name" className="block font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="interest"
                        className="block font-medium mb-2"
                      >
                        Car of Interest
                      </label>
                      <select
                        id="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a vehicle</option>
                        <option value="bmw-m8">BMW M8 Competition</option>
                        <option value="mercedes-s">
                          Mercedes-Benz S-Class
                        </option>
                        <option value="audi-rs7">Audi RS7 Sportback</option>
                        <option value="porsche-911">Porsche 911 Turbo S</option>
                        <option value="lamborghini-huracan">
                          Lamborghini Huracán
                        </option>
                        <option value="tesla-model-s">
                          Tesla Model S Plaid
                        </option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you"
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-l from-violet-400 to-blue-400 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Car Details Modal */}
        <AnimatePresence>
          {carModalOpen && selectedCar && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Car Details</h2>
                  <button
                    onClick={() => setCarModalOpen(false)}
                    className="text-2xl bg-gradient-to-l from-red-400 to-red-500 transition-colors"
                  >
                    <Close />
                  </button>
                </div>
                <div className="p-6">
                  <div
                    className="mb-6 h-64 bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${selectedCar.image})` }}
                  ></div>
                  <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedCar.name}
                    </h3>
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedCar.price}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Speed
                        className="text-orange-600 mr-2 text-xl"
                      />
                      <span>
                        Top Speed: <strong>{selectedCar.topSpeed}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Power
                        className="text-orange-600 mr-2 text-xl"
                      />
                      <span>
                        0-60 mph: <strong>{selectedCar.acceleration}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <LocalGasStation
                        className="text-orange-600 mr-2 text-xl"
                      />
                      <span>
                        Fuel Economy: <strong>{selectedCar.fuelEconomy}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <PowerInput
                        className="text-orange-600 mr-2 text-xl"
                      />
                      <span>
                        Horsepower: <strong>{selectedCar.horsepower}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="mb-6 leading-relaxed">
                    <p>{selectedCar.description}</p>
                  </div>
                  <button
                    onClick={openContactFromCarModal}
                    className="w-full bg-gradient-to-l from-indigo-400 to-blue-400 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                  >
                    Contact Us About This Vehicle
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};
