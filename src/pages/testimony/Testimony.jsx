/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Close,
  Star,
  StarBorder,
  NavigateBefore,
  NavigateNext,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Car Enthusiast",
      content:
        "I've purchased two cars from AutoElite and both experiences were exceptional. Their attention to detail and customer service is unmatched in the industry.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Luxury Car Collector",
      content:
        "As a collector, I'm very particular about where I source my vehicles. AutoElite has consistently provided me with pristine vehicles and transparent transactions.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      content:
        "The team at AutoElite made my first car buying experience smooth and stress-free. They explained everything clearly and found the perfect car for my budget.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Business Owner",
      content:
        "I've purchased 5 company vehicles from AutoElite. Their fleet services are excellent, and they always ensure minimal downtime for our business.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Performance Car Enthusiast",
      content:
        "The performance vehicles at AutoElite are meticulously maintained. I found my dream sports car here after searching for months elsewhere.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Classic Car Collector",
      content:
        "AutoElite's classic car division is phenomenal. They have experts who truly understand vintage vehicles and maintain them to the highest standards.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ]);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Math.ceil(testimonials.length / 3) - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Calculate the testimonials to display based on current index
  const visibleTestimonials = testimonials.slice(
    currentIndex * 3,
    currentIndex * 3 + 3
  );

  // If we don't have 3 testimonials for the last slide, add from beginning
  if (visibleTestimonials.length < 3 && testimonials.length > 3) {
    visibleTestimonials.push(
      ...testimonials.slice(0, 3 - visibleTestimonials.length)
    );
  }

  // Render star rating
  const renderStars = (rating, editable = false, onRate = null) => {
    return (
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) =>
          editable ? (
            <button
              key={i}
              type="button"
              onClick={() => onRate(i + 1)}
              className="focus:outline-none"
            >
              {i < rating ? (
                <Star className="w-6 h-6 text-yellow-400" />
              ) : (
                <StarBorder className="w-6 h-6 text-yellow-400" />
              )}
            </button>
          ) : (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )
        )}
      </div>
    );
  };

  const handleCreateTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTestimonialObj = {
      id: testimonials.length + 1,
      ...newTestimonial,
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    };

    setTestimonials([...testimonials, newTestimonialObj]);
    setIsCreateModalOpen(false);
    setNewTestimonial({
      name: "",
      role: "",
      content: "",
      rating: 5,
    });
    toast.success("Testimonial added successfully!");
  };

  return (
    <>
      <section className="w-full mt-4 py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Read testimonials from our
              satisfied customers.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-6 bg-gradient-to-l from-violet-400 to-blue-400 text-white py-2 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto"
            >
              <Add className="mr-2" />
              Add Your Testimonial
            </motion.button>
          </div>

          <div className="relative">
            {/* Testimonials grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full relative"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {renderStars(testimonial.rating)}

                    <p className="text-gray-700 mt-4 flex-grow">
                      "{testimonial.content}"
                    </p>

                    <svg
                      className="w-12 h-12 text-blue-100 mt-4 opacity-50"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Create Testimonial Modal */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
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
                    <h2 className="text-2xl text-gray-500 font-bold">
                      Share Your Experience
                    </h2>
                    <button
                      className="bg-gradient-to-l from-red-400 to-red-500"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      <Close />
                    </button>
                  </div>

                  <form
                    onSubmit={handleCreateTestimonial}
                    className="space-y-4 text-black overflow-y-auto"
                  >
                    <div>
                      <label htmlFor="name" className="block font-medium mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newTestimonial.name}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className="block font-medium mb-2">
                        Your Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        value={newTestimonial.role}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            role: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="E.g. Car Enthusiast, First-time Buyer"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rating"
                        className="block font-medium mb-2"
                      >
                        Your Rating
                      </label>
                      {renderStars(newTestimonial.rating, true, (rating) =>
                        setNewTestimonial({ ...newTestimonial, rating })
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="content"
                        className="block font-medium mb-2"
                      >
                        Your Testimonial *
                      </label>
                      <textarea
                        id="content"
                        value={newTestimonial.content}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            content: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows="4"
                        placeholder="Share your experience with us..."
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleCreateTestimonial}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors mt-4"
                    >
                      Submit Testimonial
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
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
      </section>
    </>
  );
};
