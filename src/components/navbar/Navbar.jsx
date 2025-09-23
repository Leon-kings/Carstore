/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { CarRental, Dashboard } from "@mui/icons-material";

// Import the auth context
import { useAuth } from "../../App"; // Adjust path as needed

// API base URL - replace with your actual API endpoint
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Private Route Component
const PrivateRoute = ({ children, requiredRole = null }) => {
  const { isSignedIn, user } = useAuth();
  
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.status !== requiredRole) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// AuthModal Component
const AuthModal = ({ type, isOpen, onClose, onToggleModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const isLogin = type === "login";

  useEffect(() => {
    // Reset form when modal type changes
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
        name: "",
        phone: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  }, [type, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Only validate phone for registration, not login
    if (!isLogin) {
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (!validateForm()) {
      console.log("Validation failed", errors);
      return;
    }

    setIsLoading(true);

    try {
      // In a real application, you would send this data to your backend API
      const endpoint = isLogin ? "/posts" : "/posts";

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (isLogin) {
        // Check for specific login credentials and determine user status
        let userStatus = "user"; // Default status
        
        if (formData.email === "admin@example.com" && formData.password === "admin123") {
          userStatus = "admin";
        } else if (formData.email === "user@example.com" && formData.password === "user123") {
          userStatus = "user";
        } else {
          // For demo purposes, assign random status for other users
          userStatus = Math.random() > 0.5 ? "admin" : "user";
        }

        // Create user data object
        const userData = {
          email: formData.email,
          status: userStatus,
          name: formData.name || formData.email.split('@')[0], // Use name or extract from email
          phone: formData.phone || "Not provided"
        };

        // Sign in using the auth context
        signIn(userData);
        
        // Show success message
        toast.success(`Welcome back, ${userData.name}!`);
        
        // Redirect based on user status
        setTimeout(() => {
          if (userStatus === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 1000);

      } else {
        // Registration logic
        toast.success("Registration successful! Please login.");
        
        // Reset form
        setFormData({
          email: "",
          password: "",
          name: "",
          phone: "",
          confirmPassword: "",
        });

        // Switch to login modal
        onClose();
        setTimeout(() => {
          onToggleModal("login");
        }, 300);
      }

    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(
        isLogin
          ? "Login failed. Please try again."
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleClick = () => {
    onClose();
    setTimeout(() => {
      onToggleModal(isLogin ? "register" : "login");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isLogin ? "Login to Your Account" : "Create an Account"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Demo credentials info */}
                {isLogin && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">
                      Demo Credentials:
                    </p>
                    <p className="text-xs text-blue-600">
                      Admin: admin@example.com / admin123
                    </p>
                    <p className="text-xs text-blue-600">
                      User: user@example.com / user123
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-black overflow-y-auto">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your password"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </span>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ${
                              errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Confirm your password"
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {isLogin && (
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Remember me
                        </span>
                      </label>
                      <Link
                        to="#"
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md flex justify-center items-center disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Processing...
                      </>
                    ) : (
                      <>{isLogin ? "Sign In" : "Create Account"}</>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <button
                      onClick={handleToggleClick}
                      className="bg-gradient-to-b from-red-200 to-indigo-300 font-medium"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By {isLogin ? "logging in" : "registering"}, you agree to our
                  Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Navigation Bar Component
export const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isSignedIn, signOut } = useAuth();

  // Navigation links object
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Features",
      path: "/features",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      name: "Products",
      path: "/products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
    },
    {
      name: "About",
      path: "/about",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Testimonials",
      path: "/testimonials",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
    {
      name: "FAQ",
      path: "/faq",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    signOut();
    setMobileMenuOpen(false);
    toast.success("Logged out successfully!");
  };

  const redirectToDashboard = () => {
    if (user?.status === "admin") {
      navigate("/dashboard");
    } else {
      toast.info("You need admin privileges to access the dashboard");
    }
    setMobileMenuOpen(false);
  };

  const handleToggleModal = (modalType) => {
    if (modalType === "login") {
      setShowLoginModal(true);
      setShowRegisterModal(false);
    } else if (modalType === "register") {
      setShowRegisterModal(true);
      setShowLoginModal(false);
    }
  };

  return (
    <>
      <nav className="w-full bg-gradient-to-r text-black from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={"/"}>
                <span className="flex items-center text-white font-bold text-xl">
                  <CarRental className="mr-2" />
                  AutoElite
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <div className="text-white text-sm mr-2">
                    Welcome, {user?.name || user?.email}
                  </div>
                  {user?.status === "admin" && (
                    <button
                      onClick={redirectToDashboard}
                      className="bg-gradient-to-b from-blue-400 to-indigo-400 px-4 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                    >
                      <Dashboard/>
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-transparent border bg-gradient-to-l from-blue-400 to-violet-400 px-4 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"                     
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className='text-green-500 font-bold'
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-gradient-to-l from-indigo-400 to-blue-500 px-4 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-transparent border bg-gradient-to-b from-blue-500 to-indigo-400 px-4 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-indigo-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-indigo-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}

                {isSignedIn ? (
                  <>
                    <div className="px-3 py-2 text-white text-sm border-t border-indigo-600">
                      Welcome, {user?.name || user?.email}
                    </div>
                    {user?.status === "admin" && (
                      <button
                        onClick={redirectToDashboard}
                        className="w-full text-left text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left bg-gradient-to-b from-blue-400 to-indigo-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowRegisterModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left bg-gradient-to-b from-indigo-400 to-blue-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Register
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal */}
      <AuthModal
        type="login"
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onToggleModal={handleToggleModal}
      />

      {/* Register Modal */}
      <AuthModal
        type="register"
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onToggleModal={handleToggleModal}
      />

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
    </>
  );
};

