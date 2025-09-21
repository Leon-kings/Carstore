/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";

export const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    teamMember: "",
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
    console.log("Contact form submitted:", formData);
    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      teamMember: selectedTeamMember?.name || "",
    });
    setContactModalOpen(false);
    setSelectedTeamMember(null);
  };

  const openContactModal = (member = null) => {
    setSelectedTeamMember(member);
    setFormData((prev) => ({
      ...prev,
      teamMember: member?.name || "",
    }));
    setContactModalOpen(true);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Michael Roberts",
      position: "CEO & Founder",
      experience: "25+ years in automotive industry",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Michael founded Elite Cars in 2005 with a vision to create the premier luxury car dealership experience. Under his leadership, the company has grown to become one of the most respected luxury automotive retailers in the country.",
      email: "michael@elitecars.com",
      phone: "(888) 555-1001",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Sales Director",
      experience: "15 years in luxury car sales",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Sarah leads our sales team with expertise in matching clients with their perfect luxury vehicle. Her extensive knowledge of luxury brands and personalized approach has earned her numerous industry awards.",
      email: "sarah@elitecars.com",
      phone: "(888) 555-1002",
    },
    {
      id: 3,
      name: "David Chen",
      position: "Finance Manager",
      experience: "12 years in automotive financing",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "David specializes in creating customized financing solutions for our discerning clientele. His innovative approaches to luxury vehicle financing have helped thousands of clients achieve their automotive dreams.",
      email: "david@elitecars.com",
      phone: "(888) 555-1003",
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
              Our Leadership Team
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet the experienced professionals who are dedicated to providing
              exceptional service and expertise in the luxury automotive
              industry.
            </motion.p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt=''
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.experience}
                  </p>
                  <button className="text-orange-600 font-medium bg-gradient-to-r from-indigo-400 to-blue-400">
                    View Profile →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work With Our Experts?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team is ready to help you find your perfect luxury vehicle and
              provide exceptional service.
            </p>
            <button
              onClick={() => openContactModal()}
              className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white py-3 px-8 rounded-md font-bold transition-colors"
            >
              Contact Our Team
            </button>
          </motion.div>
        </div>

        {/* Team Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Team Member Profile</h2>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-2xl bg-gradient-to-l from-red-400 to-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="w-full lg:w-1/3">
                      <div className="h-64 bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-4 flex space-x-4 justify-center">
                        <button className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors">
                          <FaLinkedin />
                        </button>
                        <button className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors">
                          <FaTwitter />
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedMember.name}
                      </h3>
                      <p className="text-orange-600 text-xl mb-4">
                        {selectedMember.position}
                      </p>
                      <p className="text-gray-600 mb-6">
                        {selectedMember.experience}
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h4 className="font-bold text-gray-900 mb-2">
                          Contact Information
                        </h4>
                        <div className="flex items-center mb-2">
                          <FaEnvelope className="text-orange-600 mr-2" />
                          <span className="text-gray-600">
                            {selectedMember.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="text-orange-600 mr-2" />
                          <span className="text-gray-600">
                            {selectedMember.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Biography
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        setSelectedMember(null);
                        openContactModal(selectedMember);
                      }}
                      className="w-full bg-gradient-to-l from-indigo-300 to-violet-300 py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
                    >
                      Contact {selectedMember.name.split(" ")[0]}
                    </button>
                  </div>
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
                  <h2 className="text-2xl font-bold">
                    {selectedTeamMember
                      ? `Contact ${selectedTeamMember.name.split(" ")[0]}`
                      : "Contact Our Team"}
                  </h2>
                  <button
                    onClick={() => {
                      setContactModalOpen(false);
                      setSelectedTeamMember(null);
                    }}
                    className="text-2xl hover:text-orange-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6">
                  {selectedTeamMember && (
                    <div className="flex items-center mb-6 p-4 bg-gray-100 rounded-lg">
                      <img
                        src={selectedTeamMember.image}
                        alt={selectedTeamMember.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-semibold text-blue-400">
                          {selectedTeamMember.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedTeamMember.position}
                        </p>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="text-black overflow-y-auto">
                    <div className="mb-4">
                      <label htmlFor="name" className="block font-medium mb-2">
                        Your Name
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
                        htmlFor="message"
                        className="block font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={`What would you like to discuss${
                          selectedTeamMember
                            ? ` with ${selectedTeamMember.name.split(" ")[0]}`
                            : ""
                        }?`}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
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
