/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCarSide,
  FaShieldAlt,
  FaMoneyBillWave,
  FaTools,
  FaHeadset,
  FaHandshake,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    });
    setContactModalOpen(false);
    // You might want to add a success notification here
  };

  const services = [
    {
      id: 1,
      title: "New Vehicle Sales",
      icon: <FaCarSide className="text-3xl" />,
      description:
        "Explore our extensive collection of the latest luxury models from top brands worldwide.",
      details:
        "We offer the newest models from BMW, Mercedes-Benz, Audi, Porsche, and other premium manufacturers. Our showroom features the latest technology, safety features, and luxury amenities. Our sales consultants are trained to help you find the perfect vehicle that matches your lifestyle and preferences.",
      features: [
        "Latest models from premium brands",
        "Comprehensive test drive experience",
        "Custom ordering available",
        "Vehicle customization options",
        "Competitive pricing",
      ],
      image:
        "https://www.topgear.com/sites/default/files/cars-car/image/2019/10/bmw_m8_coupe_fire_red_033.jpg",
    },
    {
      id: 2,
      title: "Pre-Owned Excellence",
      icon: <FaShieldAlt className="text-3xl" />,
      description:
        "Certified pre-owned vehicles that undergo rigorous inspection and come with warranty.",
      details:
        "Our certified pre-owned program includes a 150-point inspection, extended warranty options, and comprehensive vehicle history reports. Each vehicle is reconditioned to meet our high standards. We only select low-mileage, well-maintained vehicles from reputable sources.",
      features: [
        "150-point comprehensive inspection",
        "Extended warranty coverage",
        "Vehicle history reports",
        "Rigorous reconditioning process",
        "7-day exchange policy",
      ],
      image:
        "https://www.topgear.com/sites/default/files/2021/12/18.%20Koenigsegg%20Jesko.jpeg",
    },
    {
      id: 3,
      title: "Financing Solutions",
      icon: <FaMoneyBillWave className="text-3xl" />,
      description:
        "Tailored financing options with competitive rates and flexible terms.",
      details:
        "Our finance experts work with multiple lenders to secure the best rates and terms for your situation. We offer lease options, loans, and specialty financing for exotic vehicles. Our team will guide you through the entire process and help you understand all your options.",
      features: [
        "Competitive interest rates",
        "Flexible loan terms",
        "Lease options available",
        "Quick approval process",
        "Online payment portal",
      ],
      image:
        "https://s19532.pcdn.co/wp-content/uploads/2018/11/Snap-Finance-Credit-Card-Financing-Solutions.jpg",
    },
    {
      id: 4,
      title: "Service & Maintenance",
      icon: <FaTools className="text-3xl" />,
      description:
        "Factory-trained technicians using genuine parts to maintain your vehicle's performance.",
      details:
        "Our state-of-the-art service center features specialized equipment for luxury vehicles. We offer maintenance packages, warranty service, and performance upgrades. Our technicians receive ongoing training to stay current with the latest technologies and repair techniques.",
      features: [
        "Factory-trained technicians",
        "Genuine parts and fluids",
        "State-of-the-art equipment",
        "Loaner vehicles available",
        "Pickup and delivery service",
      ],
      image:
        "https://repairsmith-prod-wordpress.s3.amazonaws.com/2022/11/mechanic-working-on-engine.jpg",
    },
    {
      id: 5,
      title: "Concierge Services",
      icon: <FaHeadset className="text-3xl" />,
      description:
        "Personalized assistance for vehicle delivery, customization, and ongoing support.",
      details:
        "Our concierge team can arrange vehicle delivery anywhere in the country, handle customization requests, and provide ongoing support throughout your ownership experience. We aim to make every aspect of vehicle ownership seamless and enjoyable.",
      features: [
        "Nationwide delivery service",
        "Customization coordination",
        "24/7 support line",
        "Appointment scheduling",
        "Personal account manager",
      ],
      image:
        "https://airssist.com/wp-content/uploads/2022/12/hotel-concierge.jpg?_t=1724142992",
    },
    {
      id: 6,
      title: "Trade-In Evaluation",
      icon: <FaHandshake className="text-3xl" />,
      description:
        "Get a competitive offer for your current vehicle when upgrading to a new luxury car.",
      details:
        "We provide fair market valuations for trade-ins and can handle all paperwork to make your upgrade process seamless and convenient. Our team will thoroughly inspect your vehicle and provide a competitive offer based on current market conditions.",
      features: [
        "Fair market valuation",
        "Quick appraisal process",
        "Paperwork handling",
        "Competitive offers",
        "Seamless upgrade process",
      ],
      image:
        "https://liftkit.imgix.net/blog/az1001/images/featured-image-3209.jpg",
    },
  ];

  return (
    <>
      <div className="w-full mt-4 min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer a comprehensive range of services to meet all your
              automotive needs, from purchase to maintenance and beyond.
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-orange-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white font-medium "
                >
                  Learn more →
                </button>
              </motion.div>
            ))}
          </div>

          {/* Additional Services Section */}
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Additional Premium Services
            </h2>
            <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-8">
              <div className="w-full">
                <h4 className="text-xl font-bold text-amber-100 mb-4">Vehicle Storage</h4>
                <p className="text-gray-300">
                  Climate-controlled storage solutions for seasonal or
                  collectible vehicles with regular maintenance and security
                  monitoring.
                </p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-amber-100 mb-4">Performance Upgrades</h4>
                <p className="text-gray-300">
                  Expert installation of performance parts and tuning to enhance
                  your vehicle's capabilities while maintaining warranty
                  coverage.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Experience Our Services?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about how we can serve your
              automotive needs.
            </p>
            <button
              onClick={() => setContactModalOpen(true)}
              className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-3 px-8 rounded-md font-bold hover:bg-orange-700 transition-colors"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {selectedService.title}
                  </h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-2xl bg-gradient-to-r from-red-400 to-red-600 text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="w-full lg:w-1/3">
                      <div className="h-64 bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={selectedService.image}
                          alt=''
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                      <div className="text-orange-600 mb-4 text-4xl">
                        {selectedService.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {selectedService.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {selectedService.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Service Details
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedService.details}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(null);
                      setContactModalOpen(true);
                    }}
                    className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                  >
                    Inquire About This Service
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Contact Modal */}
        <AnimatePresence>
          {contactModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-md max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                  <button
                    onClick={() => setContactModalOpen(false)}
                    className="text-2xl bg-gradient-to-l from-red-400 to-red-500 text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="text-black overflow-y-auto">
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
                      className="w-full bg-gradient-to-l from-blue-400 to-violet-500 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
