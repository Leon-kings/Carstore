/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaBolt,
  FaShieldAlt,
  FaCog,
  FaSatellite,
  FaSnowflake,
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
  FaTimes,
  FaGasPump,
  FaTachometerAlt,
  FaCarSide,
  FaArrowLeft,
  FaArrowRight as FaArrowRightIcon,
} from "react-icons/fa";

export const NewFeatures = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const categories = [
    { id: "all", name: "All Features", icon: <FaCar /> },
    { id: "technology", name: "Technology", icon: <FaSatellite /> },
    { id: "comfort", name: "Comfort", icon: <FaSnowflake /> },
  ];

  const carFeatures = [
    {
      id: 1,
      title: "Augmented Reality HUD",
      category: "technology",
      description:
        "Projected navigation and safety information directly onto the windshield for enhanced situational awareness.",
      longDescription:
        "The augmented reality head-up display projects critical information directly onto the windshield, appearing to float ahead of the vehicle. This includes navigation arrows that seem to point to the actual road, speed limits, and safety warnings that help drivers maintain focus on the road.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaSatellite />,
      status: "updated",
      releaseDate: "2025-05-22",
      benefits: [
        "Reduces distraction by keeping eyes on the road",
        "Intuitive navigation guidance",
        "Real-time safety alerts",
      ],
      availableIn: ["BMW X7", "Mercedes S-Class", "Genesis GV80"],
    },
    {
      id: 2,
      title: "Biometric Vehicle Access",
      category: "technology",
      description:
        "Facial recognition and fingerprint scanning replace traditional keys for seamless vehicle entry and startup.",
      longDescription:
        "Forget carrying keys or fobs. This system uses facial recognition cameras and fingerprint sensors to identify authorized drivers. The vehicle automatically adjusts seats, mirrors, climate settings, and entertainment preferences based on who is driving.",
      image:
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaCog />,
      status: "new",
      releaseDate: "2025-06-10",
      benefits: [
        "Keyless convenience with enhanced security",
        "Personalized settings for multiple drivers",
        "Theft prevention through biometric verification",
      ],
      availableIn: ["Genesis G90", "Hyundai Ioniq 6", "Kia EV9"],
    },
    {
      id: 3,
      title: "Advanced Climate Control",
      category: "comfort",
      description:
        "Multi-zone microclimate system with infrared body temperature sensing for optimal comfort.",
      longDescription:
        "This sophisticated climate system uses infrared sensors to detect each occupant's body temperature and adjusts heating or cooling accordingly. It can create different climate zones within the vehicle and even focus ventilation on specific areas where occupants need it most.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaSnowflake />,
      status: "coming-soon",
      releaseDate: "2025-10-05",
      benefits: [
        "Individualized comfort for all passengers",
        "Energy efficient operation",
        "Quick temperature stabilization",
      ],
      availableIn: ["Mercedes E-Class", "BMW 7 Series", "Audi A6"],
    },
    {
      id: 4,
      title: "Autonomous Driving",
      category: "technology",
      description:
        "Level 4 autonomous driving capability for hands-free highway driving.",
      longDescription:
        "This advanced autonomous system allows for completely hands-free driving on approved highways. The vehicle can navigate, change lanes, and handle complex traffic situations without driver intervention.",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaCarSide />,
      status: "new",
      releaseDate: "2025-07-15",
      benefits: [
        "Reduces driver fatigue on long trips",
        "Enhanced safety through predictive algorithms",
        "Optimized traffic flow and fuel efficiency",
      ],
      availableIn: ["Tesla Model S", "Audi A8", "BMW i7"],
    },
    {
      id: 5,
      title: "Predictive Suspension",
      category: "comfort",
      description:
        "Camera-based system that scans the road ahead and adjusts suspension in real-time.",
      longDescription:
        "Using forward-facing cameras and sensors, this system scans the road surface ahead and adjusts the suspension to prepare for bumps, potholes, and other road imperfections before the wheels encounter them.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaTachometerAlt />,
      status: "updated",
      releaseDate: "2025-04-10",
      benefits: [
        "Superior ride comfort on all road surfaces",
        "Reduced wear on suspension components",
        "Enhanced vehicle stability and control",
      ],
      availableIn: ["Mercedes S-Class", "Range Rover", "Porsche Cayenne"],
    },
    {
      id: 6,
      title: "Solar Roof",
      category: "technology",
      description:
        "Integrated solar panels that extend electric range and power auxiliary systems.",
      longDescription:
        "The vehicle's roof is equipped with high-efficiency solar cells that can generate enough electricity to add meaningful range to electric vehicles or power auxiliary systems in conventional vehicles, reducing the load on the alternator.",
      image:
        "https://images.unsplash.com/photo-1621831309785-850772ae8255?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaBolt />,
      status: "new",
      releaseDate: "2025-08-20",
      benefits: [
        "Extended range for electric vehicles",
        "Reduced fuel consumption for hybrid vehicles",
        "Power for camping and auxiliary uses",
      ],
      availableIn: ["Hyundai Sonata Hybrid", "Toyota bZ4X", "Fisker Ocean"],
    },
    {
      id: 7,
      title: "Advanced Driver Monitoring",
      category: "technology",
      description:
        "Infrared cameras track driver attention and alertness to prevent accidents.",
      longDescription:
        "Using infrared cameras and AI algorithms, this system continuously monitors the driver's eye movements, head position, and facial expressions to detect signs of distraction, fatigue, or impairment, issuing warnings or taking corrective action when needed.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaShieldAlt />,
      status: "updated",
      releaseDate: "2025-03-05",
      benefits: [
        "Reduces accidents caused by distracted driving",
        "Early detection of driver fatigue",
        "Customizable alert preferences",
      ],
      availableIn: ["Subaru Outback", "Ford Mustang Mach-E", "GM Super Cruise vehicles"],
    },
    {
      id: 8,
      title: "Vehicle-to-Everything (V2X) Communication",
      category: "technology",
      description:
        "Enables communication with other vehicles, infrastructure, and the grid.",
      longDescription:
        "V2X technology allows your vehicle to communicate with other vehicles (V2V), infrastructure (V2I), pedestrians (V2P), and the grid (V2G). This enables advanced safety features, optimized routing, and energy management capabilities.",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaSatellite />,
      status: "coming-soon",
      releaseDate: "2025-12-01",
      benefits: [
        "Enhanced situational awareness beyond line of sight",
        "Optimized traffic flow and reduced congestion",
        "Energy grid stabilization capabilities",
      ],
      availableIn: ["Audi e-tron", "Ford F-150 Lightning", "BMW iX"],
    },
    {
      id: 9,
      title: "Advanced Parking Assist",
      category: "technology",
      description:
        "Fully automated parking with remote control via smartphone app.",
      longDescription:
        "This system can autonomously park the vehicle in both parallel and perpendicular spaces without a driver inside. Using smartphone connectivity, you can initiate parking from outside the vehicle and monitor the process through the app.",
      image:
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FaCog />,
      status: "new",
      releaseDate: "2025-05-30",
      benefits: [
        "Eliminates stress from tight parking spaces",
        "Prevents door dings in crowded lots",
        "Remote parking capability",
      ],
      availableIn: ["BMW 7 Series", "Mercedes EQS", "Genesis GV60"],
    },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? carFeatures
      : carFeatures.filter((feature) => feature.category === activeCategory);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeatures.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800";
      case "updated":
        return "bg-blue-100 text-blue-800";
      case "coming-soon":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen mt-4 bg-gray-50 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest Car Features
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore the cutting-edge technologies and innovations available in
              today's luxury vehicles.
            </motion.p>
          </div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? "bg-gradient-to-l from-indigo-400 to-violet-300 text-white"
                    : "bg-gradient-to-r from-blue-300 to-indigo-300"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentItems.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        feature.status
                      )}`}
                    >
                      {feature.status === "coming-soon"
                        ? "Coming Soon"
                        : feature.status === "updated"
                        ? "Updated"
                        : "New"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-orange-600 text-xl mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      <span>
                        {new Date(feature.releaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <button className="bg-gradient-to-b from-indigo-400 to-blue-400 font-medium flex items-center">
                      Learn more <FaArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {filteredFeatures.length > itemsPerPage && (
            <motion.div 
              className="flex justify-center items-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gradient-to-r from-blue-300 to-indigo-300 hover:from-blue-400 hover:to-indigo-400 text-white"
                }`}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
              
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gradient-to-r from-blue-300 to-indigo-300 hover:from-blue-400 hover:to-indigo-400 text-white"
                }`}
              >
                Next <FaArrowRightIcon className="ml-2" />
              </button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience These Features
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Visit our showroom to experience these cutting-edge features
              firsthand.
            </p>
          </motion.div>
        </div>

        {/* Feature Detail Modal */}
        <AnimatePresence>
          {selectedFeature && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {selectedFeature.title}
                  </h2>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="text-2xl bg-gradient-to-t from-red-400 to-red-500 text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="w-full lg:w-1/2">
                      <div className="h-80 bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={selectedFeature.image}
                          alt={selectedFeature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <div className="text-orange-600 text-xl mr-2">
                            {selectedFeature.icon}
                          </div>
                          <span className="text-gray-700 capitalize">
                            {selectedFeature.category}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              selectedFeature.status
                            )}`}
                          >
                            {selectedFeature.status === "coming-soon"
                              ? "Coming Soon"
                              : selectedFeature.status === "updated"
                              ? "Updated"
                              : "New"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        <span>
                          Available since{" "}
                          {new Date(
                            selectedFeature.releaseDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {selectedFeature.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {selectedFeature.longDescription}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {selectedFeature.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheckCircle className="text-green-500 mr-2" />
                              <span className="text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Available In These Models
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedFeature.availableIn.map((model, index) => (
                        <div
                          key={index}
                          className="text-center p-4 bg-white rounded-lg"
                        >
                          <div className="text-lg font-bold text-gray-900">
                            {model}
                          </div>
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(
                              selectedFeature.status
                            )}`}
                          >
                            {selectedFeature.status === "coming-soon"
                              ? "Coming Soon"
                              : selectedFeature.status === "updated"
                              ? "Available"
                              : "Standard"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};