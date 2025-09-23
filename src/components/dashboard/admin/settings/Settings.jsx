/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Settings as SettingsIcon,
  RateReview as TestimonyIcon,
  DirectionsCar as CarIcon,
  Save as SaveIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Close as CloseIcon,
  Star as StarIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    emailUpdates: false,
    twoFactor: false,
    language: "en",
  });

  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isTestimonyModalOpen, setIsTestimonyModalOpen] = useState(false);

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    const html = document.documentElement;
    if (settings.theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Save theme preference to localStorage
    localStorage.setItem("theme", settings.theme);
  }, [settings.theme]);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSettings((prev) => ({ ...prev, theme: savedTheme }));
  }, []);

  // Create Car Modal Component
  const CreateCarModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      image: "",
      description: "",
      specs: {
        range: "",
        topSpeed: "",
        acceleration: "",
        seating: "",
        charging: "",
      },
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name.includes("specs.")) {
        const specField = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          specs: {
            ...prev.specs,
            [specField]: value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        id: Date.now(),
      });
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        specs: {
          range: "",
          topSpeed: "",
          acceleration: "",
          seating: "",
          charging: "",
        },
      });
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create New Car
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Basic Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Car Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Hyundai Ioniq 5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="39450"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="https://example.com/car-image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Retro-futuristic electric crossover"
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Specifications
                    </h3>

                    {Object.keys(formData.specs).map((spec) => (
                      <div key={spec}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                          {spec.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          name={`specs.${spec}`}
                          value={formData.specs[spec]}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder={`Enter ${spec}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Image Preview
                    </h3>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Create Car
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Create Testimony Modal Component (replaced Create User)
  const CreateTestimonyModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      role: "",
      content: "",
      rating: 5,
      image: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "rating" ? parseInt(value) : value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        id: Date.now(),
      });
      setFormData({
        name: "",
        role: "",
        content: "",
        rating: 5,
        image: "",
      });
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create New Testimony
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Robert Martinez"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role/Title
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Classic Car Collector"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Testimonial Content
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="AutoElite's classic car division is phenomenal..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        name="rating"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {formData.rating}
                        </span>
                        <StarIcon className="text-yellow-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://example.com/profile.jpg"
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview
                      </h3>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-full border border-gray-300 dark:border-gray-600"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    Create Testimony
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // SettingsPage main functions
  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: settings.theme === "dark" ? "dark" : "light",
    });
  };

  const handleCarCreated = (carData) => {
    toast.success(`Car "${carData.name}" created successfully!`, {
      theme: settings.theme === "dark" ? "dark" : "light",
    });
    setIsCarModalOpen(false);
  };

  const handleTestimonyCreated = (testimonyData) => {
    toast.success(
      `Testimony for "${testimonyData.name}" created successfully!`,
      {
        theme: settings.theme === "dark" ? "dark" : "light",
      }
    );
    setIsTestimonyModalOpen(false);
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <ToastContainer
            theme={settings.theme === "dark" ? "dark" : "light"}
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SettingsIcon className="text-3xl text-blue-600 dark:text-blue-400" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your account settings and create new content
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {settings.theme === "light" ? (
                  <DarkModeIcon className="text-gray-700" />
                ) : (
                  <LightModeIcon className="text-yellow-400" />
                )}
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h2>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCarModalOpen(true)}
                    className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    <CarIcon />
                    <span>Create Car Post</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsTestimonyModalOpen(true)}
                    className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    <TestimonyIcon />
                    <span>Create Testimony</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Settings Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  {/* Theme Settings */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <PaletteIcon className="text-purple-500" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Theme
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred theme
                        </p>
                      </div>
                    </div>
                    <select
                      value={settings.theme}
                      onChange={(e) =>
                        handleSettingChange("theme", e.target.value)
                      }
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <NotificationsIcon className="text-blue-500" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Notifications
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive desktop notifications
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) =>
                          handleSettingChange("notifications", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  {/* Security */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SecurityIcon className="text-green-500" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add an extra layer of security
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactor}
                        onChange={(e) =>
                          handleSettingChange("twoFactor", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  {/* Save Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveSettings}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    <SaveIcon />
                    <span>Save Settings</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Render Modals */}
          <CreateCarModal
            isOpen={isCarModalOpen}
            onClose={() => setIsCarModalOpen(false)}
            onSubmit={handleCarCreated}
          />

          <CreateTestimonyModal
            isOpen={isTestimonyModalOpen}
            onClose={() => setIsTestimonyModalOpen(false)}
            onSubmit={handleTestimonyCreated}
          />
        </div>
      </div>
    </>
  );
};
