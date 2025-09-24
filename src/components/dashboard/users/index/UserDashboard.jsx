/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Sidebar } from "../components/sidebar/Sidebar";

// Import Sidebar



const NotificationModal = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New Message",
      content: "John Smith inquired about the Tesla Model 3",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "appointment",
      title: "Test Drive Scheduled",
      content: "Test drive scheduled for Toyota RAV4 tomorrow at 10 AM",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "sale",
      title: "Vehicle Sold",
      content: "2022 Honda Civic was sold to Emily Johnson",
      time: "Yesterday",
      read: true,
    },
    {
      id: 4,
      type: "lead",
      title: "New Lead",
      content: "Michael Brown is interested in SUVs",
      time: "2 days ago",
      read: true,
    },
    // Adding more notifications to demonstrate scrolling
    {
      id: 5,
      type: "message",
      title: "New Message",
      content: "Sarah Wilson asked about financing options",
      time: "3 days ago",
      read: true,
    },
    {
      id: 6,
      type: "appointment",
      title: "Appointment Rescheduled",
      content: "Test drive for BMW X5 moved to Friday 2 PM",
      time: "4 days ago",
      read: true,
    },
    {
      id: 7,
      type: "sale",
      title: "Vehicle Sold",
      content: "2023 Ford Mustang was sold to Robert Davis",
      time: "1 week ago",
      read: true,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <EmailIcon className="text-blue-500" />;
      case "appointment":
        return <EventAvailableIcon className="text-green-500" />;
      case "sale":
        return <LocalOfferIcon className="text-purple-500" />;
      case "lead":
        return <PeopleIcon className="text-yellow-500" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const handleMarkAllAsRead = () => {
    // This would typically update the state to mark all as read
    console.log("Mark all as read clicked");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button
                onClick={onClose}
                className="bg-gradient-to-b from-red-400 to-red-600 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Notifications List with scrolling */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <NotificationsIcon className="mx-auto text-gray-300 text-4xl" />
                  <p className="mt-2">No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-4 border-t">
              <button 
                onClick={handleMarkAllAsRead}
                className="w-full py-2 bg-gradient-to-b from-blue-400 to-indigo-400 transition-colors font-medium"
              >
                Mark all as read
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



// ---------------- User Modal ----------------
const UserModal = ({ isOpen, onClose }) => {
  const user = {
    name: "John Doe",
    email: "john.doe@carsales.com",
    phone: "+1 (555) 123-4567",
    role: "Sales Manager",
    location: "New York, NY",
    avatar: <AccountCircleIcon className="text-4xl text-blue-600" />,
    stats: [
      { label: "Deals Closed", value: "42" },
      { label: "Total Revenue", value: "$1.2M" },
      { label: "Customer Rating", value: "4.8/5" },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">User Profile</h3>
              <button
                onClick={onClose}
                className="bg-gradient-to-b from-red-400 to-red-600"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {user.avatar}
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <EmailIcon className="text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <LocationOnIcon className="text-gray-400" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {user.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 text-center"
                  >
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------- Stat Card ----------------
const StatCard = ({ title, value, change, icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p
          className={`text-sm mt-2 ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
        </p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

// ---------------- Dashboard ----------------
export const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const monthlySalesData = [
    { month: "Jan", sales: 42, revenue: 1250000 },
    { month: "Feb", sales: 38, revenue: 1120000 },
    { month: "Mar", sales: 51, revenue: 1530000 },
    { month: "Apr", sales: 47, revenue: 1410000 },
    { month: "May", sales: 55, revenue: 1650000 },
    { month: "Jun", sales: 58, revenue: 1740000 },
    { month: "Jul", sales: 62, revenue: 1860000 },
  ];

  const carCategoryData = [
    { name: "Sedans", value: 35 },
    { name: "SUVs", value: 40 },
    { name: "Trucks", value: 15 },
    { name: "Luxury", value: 10 },
  ];

  const inventoryData = [
    { name: "In Stock", value: 65 },
    { name: "Test Drive", value: 15 },
    { name: "Service", value: 12 },
    { name: "Sold", value: 8 },
  ];

  const leadSourceData = [
    { day: "1", website: 20, social: 12, referral: 8 },
    { day: "5", website: 25, social: 15, referral: 10 },
    { day: "10", website: 22, social: 18, referral: 12 },
    { day: "15", website: 30, social: 22, referral: 15 },
    { day: "20", website: 28, social: 20, referral: 14 },
    { day: "25", website: 35, social: 25, referral: 18 },
    { day: "30", website: 40, social: 30, referral: 22 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const INVENTORY_COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <ToastContainer />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <div className="flex items-center">
            <h1 className="ml-4 text-xl font-semibold">Dashboard Overview</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setNotificationOpen(true)}
              className="relative p-2 bg-gradient-to-r from-blue-400 to-indigo-400"
            >
              <NotificationsIcon className="text-red-400"/>
              <span className="absolute top-0 right-0 w-4 h-4 text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button
              onClick={() => setUserModalOpen(true)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-400"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <AccountCircleIcon className="text-blue-600" />
              </div>
              <span className="hidden md:block">John Doe</span>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Sales"
              value="42"
              change={12}
              icon={<DirectionsCarIcon />}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              title="Customers"
              value="158"
              change={8}
              icon={<PeopleIcon />}
              color="bg-green-100 text-green-600"
            />
            <StatCard
              title="Revenue"
              value="$1.2M"
              change={15}
              icon={<PaymentIcon />}
              color="bg-purple-100 text-purple-600"
            />
            <StatCard
              title="Appointments"
              value="26"
              change={-5}
              icon={<ScheduleIcon />}
              color="bg-yellow-100 text-yellow-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales & Revenue */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Sales & Revenue</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#0088FE" />
                  <Bar dataKey="revenue" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Car Categories */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Car Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={carCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {carCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={INVENTORY_COLORS[index % INVENTORY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Leads */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={leadSourceData}>
                  <defs>
                    <linearGradient
                      id="colorWebsite"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorSocial"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorReferral"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="website"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorWebsite)"
                  />
                  <Area
                    type="monotone"
                    dataKey="social"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorSocial)"
                  />
                  <Area
                    type="monotone"
                    dataKey="referral"
                    stroke="#ffc658"
                    fillOpacity={1}
                    fill="url(#colorReferral)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <NotificationModal
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <UserModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />
    </div>
  );
};
