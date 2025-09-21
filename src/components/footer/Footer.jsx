/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Send,
  Copyright,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Footer links organized as objects
const footerLinks = {
  company: {
    title: "AutoElite",
    description:
      "Your premium destination for luxury and performance vehicles. We offer the finest selection of cars with exceptional service.",
    social: [
      { icon: Facebook, color: "bg-gradient-to-l from-blue-500 to-purple-500" },
      { icon: Twitter, color: "bg-gradient-to-l from-blue-400 to-blue-600" },
      { icon: Instagram, color: "bg-gradient-to-l from-pink-500 to-red-500" },
      { icon: LinkedIn, color: "bg-gradient-to-l from-blue-600 to-blue-800" },
    ],
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Inventory", href: "/products" },
      { name: "Services", href: "/services" },
      { name: "Testimonials", href: "/testimonials" },
    ],
  },
  contact: {
    title: "Contact Us",
    details: [
      {
        icon: LocationOn,
        text: "SE Zone, Kigali , KG 42 Ave",
        color: "text-blue-400",
      },
      { icon: Phone, text: "+250 (787) 944-577", color: "text-blue-400" },
      { icon: Email, text: "info@autoelite.com", color: "text-blue-400" },
    ],
  },
  newsletter: {
    title: "Newsletter",
    description:
      "Subscribe to our newsletter for the latest car models and exclusive offers.",
  },
};

// API service with Axios
const apiService = {
  submitNewsletter: async (email) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "https://api.example.com/newsletter/subscribe",
        {
          email: email,
          source: "website_footer",
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        throw new Error(
          error.response.data.message ||
            "Subscription failed. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      } else {
        // Something else happened
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  },
};

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.submitNewsletter(newsletterEmail);
      toast.success(
        response.message || "Successfully subscribed to newsletter!"
      );
      setNewsletterEmail("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-6">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <motion.h3
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {footerLinks.company.title}
              </motion.h3>
              <p className="text-gray-400 leading-relaxed">
                {footerLinks.company.description}
              </p>
              <div className="flex space-x-4 pt-2">
                {footerLinks.company.social.map((social, index) => (
                  <motion.button
                    key={index}
                    href={social.href}
                    className={`text-gray-400 transition-colors ${social.color} rounded-full bg-gray-800 p-2`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="justify-center items-center">
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                {footerLinks.quickLinks.title}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3 justify-items-center">
                {footerLinks.quickLinks.links.map((link, index) => (
                  <li key={index} className="justify-between">
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group py-2"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                {footerLinks.contact.title}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
              </h3>
              <div className="space-y-4">
                {footerLinks.contact.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <detail.icon
                      className={`mt-1 mr-3 ${detail.color} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {detail.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup - Enhanced Design */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                {footerLinks.newsletter.title}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {footerLinks.newsletter.description}
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="space-y-4 text-black"
              >
                <motion.div
                  className="relative rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-0.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg hover:shadow-blue-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2" />
                      Subscribe Now
                    </>
                  )}
                </motion.button>
              </form>
              <p className="text-gray-500 text-xs mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
          <div className="right-0">
            <span className="text-blue-100 right-0"> Designed by Leon.</span>
          </div>
          {/* Copyright */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Copyright className="mr-1" style={{ fontSize: "16px" }} />
            <span className="text-blue-100">
              {" "}
              {new Date().getFullYear()} AutoElite.{" "}
              <span className="text-blue-500"> All rights</span> reserved.
            </span>
          </motion.div>
        </div>
      </footer>

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
        theme="dark"
      />
    </>
  );
};
