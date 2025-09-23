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
  Payment as PaymentIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CreditCard as CreditCardIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
  AttachMoney as MoneyIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Sidebar } from '../sidebar/Sidebar';

export const PaymentManagement = () => {
  // Sample initial data
  const initialPayments = [
    {
      id: 1,
      customerInfo: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 4242",
        expiry: "12/25",
        cvv: "***",
        nameOnCard: "John Smith"
      },
      amount: 39450,
      currency: "USD",
      status: "completed",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234567",
      createdAt: "2024-01-15",
      description: "Hyundai Ioniq 5 Purchase"
    },
    {
      id: 2,
      customerInfo: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Los Angeles, CA 90210"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 5555",
        expiry: "03/26",
        cvv: "***",
        nameOnCard: "Sarah Johnson"
      },
      amount: 74990,
      currency: "USD",
      status: "completed",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234568",
      createdAt: "2024-01-14",
      description: "Tesla Model S Purchase"
    },
    {
      id: 3,
      customerInfo: {
        name: "Mike Wilson",
        email: "mike.wilson@example.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine Rd, Chicago, IL 60601"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 8888",
        expiry: "08/24",
        cvv: "***",
        nameOnCard: "Mike Wilson"
      },
      amount: 12500,
      currency: "USD",
      status: "pending",
      paymentMethod: "debit_card",
      transactionId: "TXN_001234569",
      createdAt: "2024-01-13",
      description: "Down Payment - BMW X5"
    },
    {
      id: 4,
      customerInfo: {
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "+1 (555) 234-5678",
        address: "321 Elm St, Miami, FL 33101"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 9999",
        expiry: "11/27",
        cvv: "***",
        nameOnCard: "Emily Davis"
      },
      amount: 2800,
      currency: "USD",
      status: "failed",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234570",
      createdAt: "2024-01-12",
      description: "Service Package - Mercedes Benz"
    },
    {
      id: 5,
      customerInfo: {
        name: "Robert Brown",
        email: "robert.b@example.com",
        phone: "+1 (555) 345-6789",
        address: "654 Maple Dr, Seattle, WA 98101"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 1111",
        expiry: "05/25",
        cvv: "***",
        nameOnCard: "Robert Brown"
      },
      amount: 56200,
      currency: "USD",
      status: "completed",
      paymentMethod: "bank_transfer",
      transactionId: "TXN_001234571",
      createdAt: "2024-01-11",
      description: "Audi Q7 Purchase"
    },
    {
      id: 6,
      customerInfo: {
        name: "Lisa Martinez",
        email: "lisa.m@example.com",
        phone: "+1 (555) 567-8901",
        address: "987 Cedar Ln, Boston, MA 02101"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 2222",
        expiry: "09/26",
        cvv: "***",
        nameOnCard: "Lisa Martinez"
      },
      amount: 32000,
      currency: "USD",
      status: "refunded",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234572",
      createdAt: "2024-01-10",
      description: "Volvo XC90 - Partial Refund"
    },
    {
      id: 7,
      customerInfo: {
        name: "David Wilson",
        email: "david.w@example.com",
        phone: "+1 (555) 678-9012",
        address: "147 Birch St, Austin, TX 73301"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 3333",
        expiry: "02/25",
        cvv: "***",
        nameOnCard: "David Wilson"
      },
      amount: 18500,
      currency: "USD",
      status: "pending",
      paymentMethod: "debit_card",
      transactionId: "TXN_001234573",
      createdAt: "2024-01-09",
      description: "Lease Payment - Honda Accord"
    },
    {
      id: 8,
      customerInfo: {
        name: "Jennifer Lee",
        email: "jennifer.lee@example.com",
        phone: "+1 (555) 789-0123",
        address: "258 Spruce Ave, Denver, CO 80201"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 4444",
        expiry: "07/26",
        cvv: "***",
        nameOnCard: "Jennifer Lee"
      },
      amount: 42000,
      currency: "USD",
      status: "completed",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234574",
      createdAt: "2024-01-08",
      description: "Lexus RX 350 Purchase"
    },
    {
      id: 9,
      customerInfo: {
        name: "Thomas Clark",
        email: "thomas.c@example.com",
        phone: "+1 (555) 890-1234",
        address: "369 Willow Way, Phoenix, AZ 85001"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 6666",
        expiry: "04/25",
        cvv: "***",
        nameOnCard: "Thomas Clark"
      },
      amount: 27500,
      currency: "USD",
      status: "cancelled",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234575",
      createdAt: "2024-01-07",
      description: "Ford Mustang - Cancelled Order"
    },
    {
      id: 10,
      customerInfo: {
        name: "Amanda White",
        email: "amanda.white@example.com",
        phone: "+1 (555) 901-2345",
        address: "741 Oakwood Blvd, San Francisco, CA 94101"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 7777",
        expiry: "10/27",
        cvv: "***",
        nameOnCard: "Amanda White"
      },
      amount: 89000,
      currency: "USD",
      status: "completed",
      paymentMethod: "bank_transfer",
      transactionId: "TXN_001234576",
      createdAt: "2024-01-06",
      description: "Porsche 911 Turbo Purchase"
    },
    {
      id: 11,
      customerInfo: {
        name: "Christopher Taylor",
        email: "chris.t@example.com",
        phone: "+1 (555) 012-3456",
        address: "852 Palm St, San Diego, CA 92101"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 0000",
        expiry: "01/26",
        cvv: "***",
        nameOnCard: "Christopher Taylor"
      },
      amount: 15600,
      currency: "USD",
      status: "pending",
      paymentMethod: "debit_card",
      transactionId: "TXN_001234577",
      createdAt: "2024-01-05",
      description: "Maintenance Service Package"
    },
    {
      id: 12,
      customerInfo: {
        name: "Michelle Harris",
        email: "michelle.h@example.com",
        phone: "+1 (555) 123-4567",
        address: "963 Redwood Dr, Portland, OR 97201"
      },
      paymentInfo: {
        cardNumber: "**** **** **** 1212",
        expiry: "06/25",
        cvv: "***",
        nameOnCard: "Michelle Harris"
      },
      amount: 48500,
      currency: "USD",
      status: "completed",
      paymentMethod: "credit_card",
      transactionId: "TXN_001234578",
      createdAt: "2024-01-04",
      description: "Jeep Grand Cherokee Purchase"
    }
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Stat Card Component
  const StatCard = ({ title, value, icon, color, subtitle }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
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
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <span className="text-2xl text-white">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Payment Modal Component
  const PaymentModal = ({ isOpen, onClose, onSubmit, title, initialData }) => {
    const [formData, setFormData] = useState({
      customerInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      paymentInfo: {
        cardNumber: "",
        expiry: "",
        cvv: "",
        nameOnCard: "",
      },
      amount: "",
      description: "",
      paymentMethod: "credit_card",
      status: "pending"
    });

    React.useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          customerInfo: {
            name: "",
            email: "",
            phone: "",
            address: "",
          },
          paymentInfo: {
            cardNumber: "",
            expiry: "",
            cvv: "",
            nameOnCard: "",
          },
          amount: "",
          description: "",
          paymentMethod: "credit_card",
          status: "pending"
        });
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      if (name.startsWith('customerInfo.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          customerInfo: {
            ...prev.customerInfo,
            [field]: value
          }
        }));
      } else if (name.startsWith('paymentInfo.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          paymentInfo: {
            ...prev.paymentInfo,
            [field]: value
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };

    const formatCardNumber = (value) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = matches && matches[0] || '';
      const parts = [];
      
      for (let i = 0; i < match.length; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      
      return parts.length ? parts.join(' ') : value;
    };

    const handleCardNumberChange = (e) => {
      const formattedValue = formatCardNumber(e.target.value);
      setFormData(prev => ({
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          cardNumber: formattedValue
        }
      }));
    };

    const handleExpiryChange = (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      setFormData(prev => ({
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          expiry: value
        }
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const paymentMethods = [
      { value: "credit_card", label: "Credit Card" },
      { value: "debit_card", label: "Debit Card" },
      { value: "bank_transfer", label: "Bank Transfer" },
      { value: "paypal", label: "PayPal" },
      { value: "crypto", label: "Cryptocurrency" }
    ];

    const statusOptions = [
      { value: "pending", label: "Pending" },
      { value: "completed", label: "Completed" },
      { value: "failed", label: "Failed" },
      { value: "refunded", label: "Refunded" },
      { value: "cancelled", label: "Cancelled" }
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
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <PersonIcon className="mr-2" />
                      Customer Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="customerInfo.name"
                          value={formData.customerInfo.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="customerInfo.email"
                          value={formData.customerInfo.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="john.smith@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="customerInfo.phone"
                          value={formData.customerInfo.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <LocationIcon className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="customerInfo.address"
                          value={formData.customerInfo.address}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="123 Main St, City, State, ZIP Code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <CreditCardIcon className="mr-2" />
                      Payment Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Method *
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {paymentMethods.map(method => (
                          <option key={method.value} value={method.value}>{method.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="paymentInfo.cardNumber"
                          value={formData.paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          maxLength={19}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="paymentInfo.expiry"
                            value={formData.paymentInfo.expiry}
                            onChange={handleExpiryChange}
                            required
                            maxLength={5}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="MM/YY"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV *
                        </label>
                        <div className="relative">
                          <SecurityIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="paymentInfo.cvv"
                            value={formData.paymentInfo.cvv}
                            onChange={handleInputChange}
                            required
                            maxLength={4}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="paymentInfo.nameOnCard"
                        value={formData.paymentInfo.nameOnCard}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount ($) *
                      </label>
                      <div className="relative">
                        <MoneyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="1000.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Payment description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
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
                    {initialData ? 'Update Payment' : 'Create Payment'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Filter payments based on search and filters
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesPaymentMethod = filterPaymentMethod === 'all' || payment.paymentMethod === filterPaymentMethod;
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  // Pagination logic
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterPaymentMethod]);

  const handleCreatePayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: Date.now(),
      transactionId: `TXN_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      currency: "USD",
      amount: parseFloat(paymentData.amount)
    };
    setPayments(prev => [newPayment, ...prev]);
    toast.success(`Payment for "${paymentData.customerInfo.name}" created successfully!`);
    setIsCreateModalOpen(false);
  };

  const handleEditPayment = (paymentData) => {
    setPayments(prev => prev.map(payment => 
      payment.id === editingPayment.id ? { 
        ...paymentData, 
        id: payment.id, 
        transactionId: payment.transactionId,
        amount: parseFloat(paymentData.amount)
      } : payment
    ));
    toast.success(`Payment for "${paymentData.customerInfo.name}" updated successfully!`);
    setIsEditModalOpen(false);
    setEditingPayment(null);
  };

  const handleDeletePayment = (paymentId, customerName) => {
    if (window.confirm(`Are you sure you want to delete payment for "${customerName}"?`)) {
      setPayments(prev => prev.filter(payment => payment.id !== paymentId));
      toast.success(`Payment for "${customerName}" deleted successfully!`);
    }
  };

  const handleStatusChange = (paymentId, newStatus) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { ...payment, status: newStatus } : payment
    ));
    toast.success(`Payment status updated to ${newStatus}`);
  };

  const openEditModal = (payment) => {
    setEditingPayment(payment);
    setIsEditModalOpen(true);
  };

  // Calculate statistics
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const averageTransaction = payments.length > 0 
    ? (payments.reduce((sum, payment) => sum + payment.amount, 0) / payments.length).toFixed(2)
    : 0;

  // Payment method options for filter
  const paymentMethodOptions = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "paypal", label: "PayPal" },
    { value: "crypto", label: "Cryptocurrency" }
  ];

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
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'refunded': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit_card': return <CreditCardIcon fontSize="small" />;
      case 'debit_card': return <PaymentIcon fontSize="small" />;
      case 'bank_transfer': return '🏦';
      case 'paypal': return '🔵';
      case 'crypto': return '₿';
      default: return <PaymentIcon fontSize="small" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage customer payments and transactions
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 lg:mt-0 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <AddIcon />
              <span>Add New Payment</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            icon={<MoneyIcon />}
            color="green"
            subtitle="Completed payments"
          />
          <StatCard
            title="Total Transactions"
            value={payments.length}
            icon={<PaymentIcon />}
            color="blue"
            subtitle="All payments"
          />
          <StatCard
            title="Pending Amount"
            value={formatCurrency(pendingAmount)}
            icon="⏳"
            color="yellow"
            subtitle="Awaiting clearance"
          />
          <StatCard
            title="Average Transaction"
            value={formatCurrency(averageTransaction)}
            icon="📊"
            color="purple"
            subtitle="Mean payment value"
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
                  placeholder="Search payments by customer name, email, transaction ID..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={filterPaymentMethod}
                onChange={(e) => setFilterPaymentMethod(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Methods</option>
                {paymentMethodOptions.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstPayment + 1}-{Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} payments
        </div>

        {/* Payments Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full overflow-x-auto">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
               
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <AnimatePresence>
                  {currentPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {payment.customerInfo.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {payment.customerInfo.email}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(payment.amount)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span>{getPaymentMethodIcon(payment.paymentMethod)}</span>
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {payment.paymentMethod.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <select
                          value={payment.status}
                          onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                          className={`text-sm px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(payment.status)}`}
                        >
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="failed">Failed</option>
                          <option value="refunded">Refunded</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {payment.createdAt}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openEditModal(payment)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <EditIcon fontSize="small" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeletePayment(payment.id, payment.customerInfo.name)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <DeleteIcon fontSize="small" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No payments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all' || filterPaymentMethod !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first payment'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterPaymentMethod === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Add Your First Payment
              </button>
            )}
          </motion.div>
        )}

        {/* Pagination Controls */}
        <PaginationControls />

        {/* Modals */}
        <PaymentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePayment}
          title="Create New Payment"
        />

        <PaymentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingPayment(null);
          }}
          onSubmit={handleEditPayment}
          title="Edit Payment"
          initialData={editingPayment}
        />
      </div>
    </div>
  );
};