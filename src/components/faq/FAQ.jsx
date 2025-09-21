/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExpandMore,
  ExpandLess,
  HelpOutline,
  Search,
  Close,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      question: "How do I purchase a vehicle from AutoElite?",
      answer:
        "Purchasing a vehicle from AutoElite is simple. Browse our inventory, select your preferred vehicle, schedule a test drive, and our sales team will guide you through the financing and paperwork process.",
      category: "Purchasing",
    },
    {
      question: "What financing options are available?",
      answer:
        "We offer a variety of financing options including traditional auto loans, leasing, and in-house financing. Our financial experts will work with you to find the best solution based on your credit history and budget.",
      category: "Financing",
    },
    {
      question: "Do you offer vehicle delivery?",
      answer:
        "Yes, we offer delivery services within a 100-mile radius for free. For longer distances, we can arrange delivery at a reasonable cost through our trusted partners.",
      category: "Services",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day/500-mile money-back guarantee on all vehicles. If you're not completely satisfied, you can return the vehicle for a full refund, no questions asked.",
      category: "Policies",
    },
    {
      question: "How often should I service my vehicle?",
      answer:
        "We recommend following the manufacturer's maintenance schedule, typically every 5,000 to 7,500 miles for oil changes and routine maintenance. Our service center can set up reminders for you.",
      category: "Maintenance",
    },
    {
      question: "Do you offer warranties on used vehicles?",
      answer:
        "Yes, all our pre-owned vehicles come with a comprehensive 12-month/12,000-mile warranty. Extended warranty options are also available for purchase.",
      category: "Warranty",
    },
    {
      question: "Can I trade in my current vehicle?",
      answer:
        "Absolutely! We accept trade-ins and offer competitive valuations. Simply provide us with your vehicle details, and we'll give you an instant estimate of its value.",
      category: "Trade-in",
    },
    {
      question: "What documents do I need to purchase a car?",
      answer:
        "You'll need a valid driver's license, proof of insurance, and proof of income. If you're financing, we may also require additional documents like recent pay stubs or bank statements.",
      category: "Purchasing",
    },
    {
      question: "Do you have electric vehicles in stock?",
      answer:
        "Yes, we have a growing selection of electric and hybrid vehicles. Check our EV section to see current inventory and schedule a test drive.",
      category: "Inventory",
    },
    {
      question: "How do I schedule a test drive?",
      answer:
        "You can schedule a test drive directly through our website by clicking the 'Schedule Test Drive' button on any vehicle listing, or call our sales team during business hours.",
      category: "Services",
    },
  ];

  const categories = [...new Set(faqData.map((item) => item.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const [feedbackGiven, setFeedbackGiven] = useState({});

  const handleFeedback = (index, isHelpful) => {
    setFeedbackGiven({ ...feedbackGiven, [index]: isHelpful });
    // In a real application, you would send this feedback to your backend
  };

  return (
    <section className="py-16 mt-4  bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4"
          >
            <HelpOutline className="text-blue-600 text-2xl" />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our vehicles, services, and
            purchasing process.
          </p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative text-black flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search questions..."
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Close className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="w-full md:w-auto text-blue-500">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 text-blue-50">
          <AnimatePresence>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 bg-gradient-to-l from-gray-50 to-gray-300 py-5 text-left focus:outline-none flex justify-between items-center"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <svg
                          className="w-5 h-5 text-blue-600"
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
                      </div>
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                    </div>
                    {activeIndex === index ? (
                      <ExpandLess className="text-gray-500" />
                    ) : (
                      <ExpandMore className="text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                          <div className="flex">
                            <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                              <svg
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-700">{faq.answer}</p>
                              <div className="mt-4 flex items-center">
                                <span className="text-sm text-gray-500 mr-3">
                                  Was this helpful?
                                </span>
                                <button
                                  onClick={() => handleFeedback(index, true)}
                                  disabled={feedbackGiven[index] !== undefined}
                                  className={`p-1 rounded-md mr-2 ${
                                    feedbackGiven[index] === true
                                      ? "bg-blue-100 text-blue-600"
                                      : "text-gray-400 hover:text-gray-600"
                                  }`}
                                >
                                  <ThumbUp className="text-lg" />
                                </button>
                                <button
                                  onClick={() => handleFeedback(index, false)}
                                  disabled={feedbackGiven[index] !== undefined}
                                  className={`p-1 rounded-md ${
                                    feedbackGiven[index] === false
                                      ? "bg-blue-100 text-blue-600"
                                      : "text-gray-400 hover:text-gray-600"
                                  }`}
                                >
                                  <ThumbDown className="text-lg" />
                                </button>
                                {feedbackGiven[index] !== undefined && (
                                  <span className="text-sm text-blue-600 ml-2">
                                    Thank you for your feedback!
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-md"
              >
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please chat with our
              friendly team.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
