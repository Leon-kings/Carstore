/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import { Sidebar } from '../sidebar/Sidebar';

export const CarsDashboard = () => {
  // Sample initial data
  const initialCars = [
    {
      id: 1,
      name: "Hyundai Ioniq 5",
      price: 39450,
      image: "https://mediacloud.carbuyer.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1739535855/autoexpress/2025/02/Hyundai%20Ioniq%205%20N%20Line%20S%202025-17.jpg",
      description: "Retro-futuristic electric crossover",
      specs: {
        range: "303 miles",
        topSpeed: "115 mph",
        acceleration: "0-60 in 5.2s",
        seating: "5 adults",
        charging: "220 kW max",
      },
      status: "published",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Tesla Model S",
      price: 74990,
      image: "https://www.cnet.com/a/img/resize/4c0fbb4ee9f48b9c3619afac9c17c06c58c37be6/hub/2023/02/03/d4376d3a-1668-4a5c-99a9-0b3c6c064af1/2023-tesla-model-s-plaid-2022-09-01-01.jpg?auto=webp&fit=crop&height=675&width=1200",
      description: "Luxury all-electric sedan",
      specs: {
        range: "405 miles",
        topSpeed: "149 mph",
        acceleration: "0-60 in 3.1s",
        seating: "5 adults",
        charging: "250 kW max",
      },
      status: "published",
      createdAt: "2024-01-10"
    }
  ];

  const [cars, setCars] = useState(initialCars);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Stat Card Component (inside CarsDashboard)
  const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      red: 'from-red-500 to-red-600'
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Car Modal Component (inside CarsDashboard)
  const CarModal = ({ isOpen, onClose, onSubmit, title, initialData }) => {
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      image: '',
      description: '',
      specs: {
        range: '',
        topSpeed: '',
        acceleration: '',
        seating: '',
        charging: ''
      }
    });

    React.useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          price: '',
          image: '',
          description: '',
          specs: {
            range: '',
            topSpeed: '',
            acceleration: '',
            seating: '',
            charging: ''
          }
        });
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name.includes('specs.')) {
        const specField = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          specs: {
            ...prev.specs,
            [specField]: value
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        price: parseFloat(formData.price)
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Car Name *
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
                        Price ($) *
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
                        Image URL *
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
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Retro-futuristic electric crossover with advanced features..."
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Specifications</h3>
                    
                    {Object.keys(formData.specs).map((spec) => (
                      <div key={spec}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                          {spec.replace(/([A-Z])/g, ' $1')} *
                        </label>
                        <input
                          type="text"
                          name={`specs.${spec}`}
                          value={formData.specs[spec]}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder={`Enter ${spec.replace(/([A-Z])/g, ' $1')}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Image Preview</h3>
                    <div className="flex space-x-4">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="hidden text-red-500 text-sm items-center">
                        Unable to load image. Please check the URL.
                      </div>
                    </div>
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
                    {initialData ? 'Update Car' : 'Create Car'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Filter cars based on search and filter
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || car.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateCar = (carData) => {
    const newCar = {
      ...carData,
      id: Date.now(),
      status: "published",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCars(prev => [newCar, ...prev]);
    toast.success(`Car "${carData.name}" created successfully!`);
    setIsCreateModalOpen(false);
  };

  const handleEditCar = (carData) => {
    setCars(prev => prev.map(car => 
      car.id === editingCar.id ? { ...carData, id: car.id } : car
    ));
    toast.success(`Car "${carData.name}" updated successfully!`);
    setIsEditModalOpen(false);
    setEditingCar(null);
  };

  const handleDeleteCar = (carId, carName) => {
    if (window.confirm(`Are you sure you want to delete "${carName}"?`)) {
      setCars(prev => prev.filter(car => car.id !== carId));
      toast.success(`Car "${carName}" deleted successfully!`);
    }
  };

  const handleStatusChange = (carId, newStatus) => {
    setCars(prev => prev.map(car => 
      car.id === carId ? { ...car, status: newStatus } : car
    ));
    toast.success(`Car status updated to ${newStatus}`);
  };

  const openEditModal = (car) => {
    setEditingCar(car);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <ToastContainer />
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cars Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your car inventory and listings
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 lg:mt-0 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <AddIcon />
              <span>Add New Car</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Cars"
            value={cars.length}
            icon="🚗"
            color="blue"
          />
          <StatCard
            title="Published"
            value={cars.filter(c => c.status === 'published').length}
            icon="✅"
            color="green"
          />
          <StatCard
            title="Draft"
            value={cars.filter(c => c.status === 'draft').length}
            icon="📝"
            color="yellow"
          />
          <StatCard
            title="Archived"
            value={cars.filter(c => c.status === 'archived').length}
            icon="📁"
            color="red"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <FilterIcon className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Car Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      car.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      car.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                      {car.name}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {car.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div>🏁 {car.specs.acceleration}</div>
                    <div>⚡ {car.specs.charging}</div>
                    <div>👥 {car.specs.seating}</div>
                    <div>🚀 {car.specs.topSpeed}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openEditModal(car)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <EditIcon fontSize="small" />
                      <span>Edit</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteCar(car.id, car.name)}
                      className="flex items-center justify-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <DeleteIcon fontSize="small" />
                    </motion.button>

                    <select
                      value={car.status}
                      onChange={(e) => handleStatusChange(car.id, e.target.value)}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 text-sm border-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="published">Publish</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archive</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No cars found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first car'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Add Your First Car
              </button>
            )}
          </motion.div>
        )}

        {/* Modals */}
        <CarModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCar}
          title="Create New Car"
        />

        <CarModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCar(null);
          }}
          onSubmit={handleEditCar}
          title="Edit Car"
          initialData={editingCar}
        />
      </div>
    </div>
  );
};

