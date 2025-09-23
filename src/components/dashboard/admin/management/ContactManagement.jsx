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
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Sidebar } from '../sidebar/Sidebar';

export const ContactManagement = () => {
  // Sample initial data
  const initialContacts = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      interest: "Test Drive",
      message: "Interested in scheduling a test drive for the Hyundai Ioniq 5. Please contact me with available times.",
      status: "new",
      createdAt: "2024-01-15",
      lastContact: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      interest: "Pricing",
      message: "Looking for pricing information on the Tesla Model S. Are there any current promotions or discounts available?",
      status: "contacted",
      createdAt: "2024-01-14",
      lastContact: "2024-01-14"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@example.com",
      phone: "+1 (555) 456-7890",
      interest: "General Inquiry",
      message: "I have questions about the charging infrastructure and warranty details for electric vehicles.",
      status: "in_progress",
      createdAt: "2024-01-13",
      lastContact: "2024-01-13"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 234-5678",
      interest: "Service",
      message: "Need to schedule service for my current vehicle and would like information about your service packages.",
      status: "resolved",
      createdAt: "2024-01-12",
      lastContact: "2024-01-12"
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.b@example.com",
      phone: "+1 (555) 345-6789",
      interest: "Test Drive",
      message: "Interested in test driving multiple electric vehicles. What models are available for test drives this weekend?",
      status: "new",
      createdAt: "2024-01-11",
      lastContact: "2024-01-11"
    },
    {
      id: 6,
      name: "Lisa Martinez",
      email: "lisa.m@example.com",
      phone: "+1 (555) 567-8901",
      interest: "Financing",
      message: "Looking for financing options with low APR. Can you provide details about your financing partners?",
      status: "contacted",
      createdAt: "2024-01-10",
      lastContact: "2024-01-10"
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.w@example.com",
      phone: "+1 (555) 678-9012",
      interest: "Trade-in",
      message: "I want to trade in my current vehicle. How does your trade-in evaluation process work?",
      status: "new",
      createdAt: "2024-01-09",
      lastContact: "2024-01-09"
    },
    {
      id: 8,
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      phone: "+1 (555) 789-0123",
      interest: "Pricing",
      message: "Do you offer corporate discounts for fleet purchases? We're looking to purchase 5 vehicles.",
      status: "in_progress",
      createdAt: "2024-01-08",
      lastContact: "2024-01-08"
    },
    {
      id: 9,
      name: "Thomas Clark",
      email: "thomas.c@example.com",
      phone: "+1 (555) 890-1234",
      interest: "General Inquiry",
      message: "What are the delivery timelines for custom ordered vehicles?",
      status: "resolved",
      createdAt: "2024-01-07",
      lastContact: "2024-01-07"
    },
    {
      id: 10,
      name: "Amanda White",
      email: "amanda.white@example.com",
      phone: "+1 (555) 901-2345",
      interest: "Service",
      message: "Need information about your extended warranty options and maintenance packages.",
      status: "contacted",
      createdAt: "2024-01-06",
      lastContact: "2024-01-06"
    },
    {
      id: 11,
      name: "Christopher Taylor",
      email: "chris.t@example.com",
      phone: "+1 (555) 012-3456",
      interest: "Test Drive",
      message: "Interested in the performance models. Are there any demo vehicles available for test drives?",
      status: "new",
      createdAt: "2024-01-05",
      lastContact: "2024-01-05"
    },
    {
      id: 12,
      name: "Michelle Harris",
      email: "michelle.h@example.com",
      phone: "+1 (555) 123-4567",
      interest: "Financing",
      message: "What credit score is required for your best financing rates?",
      status: "in_progress",
      createdAt: "2024-01-04",
      lastContact: "2024-01-04"
    }
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterInterest, setFilterInterest] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Stat Card Component
  const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600'
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
            <span className="text-2xl text-white">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Contact Modal Component
  const ContactModal = ({ isOpen, onClose, onSubmit, title, initialData }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    });

    React.useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        });
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const interestOptions = [
      "General Inquiry",
      "Test Drive",
      "Pricing",
      "Financing",
      "Trade-in",
      "Service",
      "Support"
    ];

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
                <div className="grid grid-cols-1 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="John Smith"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Area of Interest *
                        </label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Select an interest</option>
                          {interestOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="john.smith@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>
                  </div>
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    {initialData ? 'Update Contact' : 'Create Contact'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesInterest = filterInterest === 'all' || contact.interest === filterInterest;
    return matchesSearch && matchesStatus && matchesInterest;
  });

  // Pagination logic
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterInterest]);

  const handleCreateContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now(),
      status: "new",
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0]
    };
    setContacts(prev => [newContact, ...prev]);
    toast.success(`Contact "${contactData.name}" created successfully!`);
    setIsCreateModalOpen(false);
  };

  const handleEditContact = (contactData) => {
    setContacts(prev => prev.map(contact => 
      contact.id === editingContact.id ? { ...contactData, id: contact.id, lastContact: new Date().toISOString().split('T')[0] } : contact
    ));
    toast.success(`Contact "${contactData.name}" updated successfully!`);
    setIsEditModalOpen(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (contactId, contactName) => {
    if (window.confirm(`Are you sure you want to delete "${contactName}"?`)) {
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      toast.success(`Contact "${contactName}" deleted successfully!`);
    }
  };

  const handleStatusChange = (contactId, newStatus) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, status: newStatus, lastContact: new Date().toISOString().split('T')[0] } : contact
    ));
    toast.success(`Contact status updated to ${newStatus}`);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  // Get unique interests for filter
  const uniqueInterests = [...new Set(contacts.map(contact => contact.interest))];

  // Pagination controls
  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center space-x-2 mt-8"
      >
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeftIcon />
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              currentPage === number
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRightIcon />
        </button>
      </motion.div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage customer inquiries and communications
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 lg:mt-0 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <AddIcon />
              <span>Add New Contact</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Contacts"
            value={contacts.length}
            icon={<PersonIcon />}
            color="blue"
          />
          <StatCard
            title="New Inquiries"
            value={contacts.filter(c => c.status === 'new').length}
            icon={<EmailIcon />}
            color="yellow"
          />
          <StatCard
            title="In Progress"
            value={contacts.filter(c => c.status === 'in_progress').length}
            icon={<BusinessIcon />}
            color="purple"
          />
          <StatCard
            title="Resolved"
            value={contacts.filter(c => c.status === 'resolved').length}
            icon="✅"
            color="green"
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
                  placeholder="Search contacts by name, email, phone, or message..."
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
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              
              <select
                value={filterInterest}
                onChange={(e) => setFilterInterest(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Interests</option>
                {uniqueInterests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstContact + 1}-{Math.min(indexOfLastContact, filteredContacts.length)} of {filteredContacts.length} contacts
        </div>

        {/* Contacts List */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {currentContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* Contact Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                              {contact.status.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {contact.interest}
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                          <div>Created: {contact.createdAt}</div>
                          <div>Last contact: {contact.lastContact}</div>
                        </div>
                      </div>

                      <div className=" gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <EmailIcon fontSize="small" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <PhoneIcon fontSize="small" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {contact.message}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-4 lg:mt-0 lg:ml-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openEditModal(contact)}
                        className="flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <EditIcon fontSize="small" />
                        <span className="hidden lg:inline">Edit</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteContact(contact.id, contact.name)}
                        className="flex items-center justify-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <DeleteIcon fontSize="small" />
                      </motion.button>

                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 text-sm border-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📞</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No contacts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all' || filterInterest !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first contact'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterInterest === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Add Your First Contact
              </button>
            )}
          </motion.div>
        )}

        {/* Pagination Controls */}
        <PaginationControls />

        {/* Modals */}
        <ContactModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateContact}
          title="Create New Contact"
        />

        <ContactModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingContact(null);
          }}
          onSubmit={handleEditContact}
          title="Edit Contact"
          initialData={editingContact}
        />
      </div>
    </div>
  );
};