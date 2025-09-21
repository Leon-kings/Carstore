/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaChartLine, FaAward } from "react-icons/fa";

export const About = () => {
  const stats = [
    {
      value: "5,000 +",
      label: "Vehicles Sold",
      icon: <FaChartLine className="text-2xl" />,
    },
    {
      value: "98%",
      label: "Customer Satisfaction",
      icon: <FaAward className="text-2xl" />,
    },
    {
      value: "5 +",
      label: "Years Experience",
      icon: <FaHistory className="text-2xl" />,
    },
    {
      value: "8 +",
      label: "Brands Available",
      icon: <FaAward className="text-2xl" />,
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
              About Elite Cars
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              For over two decades, Elite Cars has been the premier destination
              for luxury automotive enthusiasts, offering an unparalleled
              selection of the world's finest vehicles and exceptional customer
              service.
            </motion.p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-orange-600 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* History Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, Elite Cars began as a small luxury dealership
                  with a simple mission: to provide automotive enthusiasts with
                  access to the world's finest vehicles coupled with exceptional
                  service.
                </p>
                <p>
                  Over the years, we've grown into one of the nation's premier
                  luxury car retailers, but our commitment to personalized
                  service and passion for excellence remains unchanged.
                </p>
                <p>
                  Today, we represent over 50 luxury and exotic brands, with
                  state-of-the-art facilities and a team of experts dedicated to
                  making your automotive dreams a reality.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="bg-gray-200 h-80 rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://dealerimages.dealereprocess.com/image/upload/1284560.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To provide an unparalleled luxury automotive experience by
                offering exceptional vehicles, personalized service, and
                comprehensive support throughout the ownership journey.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the world's most trusted and respected luxury automotive
                retailer, setting the standard for excellence in vehicle
                selection, customer service, and innovation.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Excellence
                </h4>
                <p className="text-gray-600">
                  We strive for perfection in every aspect of our business, from
                  vehicle selection to customer service.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Integrity
                </h4>
                <p className="text-gray-600">
                  We conduct business with honesty, transparency, and respect
                  for our customers and team members.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Innovation
                </h4>
                <p className="text-gray-600">
                  We embrace new technologies and approaches to enhance the
                  luxury car buying experience.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
