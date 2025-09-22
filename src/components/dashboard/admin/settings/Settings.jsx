/* eslint-disable no-unused-vars */
// Settings.jsx
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Models
class Car {
  constructor(id, make, model, year, price, specs, images, status) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.price = price;
    this.specs = specs;
    this.images = images;
    this.status = status;
    this.createdAt = new Date();
  }
}

class Testimonial {
  constructor(id, customerName, rating, comment, carModel, date, approved) {
    this.id = id;
    this.customerName = customerName;
    this.rating = rating;
    this.comment = comment;
    this.carModel = carModel;
    this.date = date;
    this.approved = approved;
  }
}

class UserSettings {
  constructor(notifications, theme, language, emailPreferences) {
    this.notifications = notifications;
    this.theme = theme;
    this.language = language;
    this.emailPreferences = emailPreferences;
  }
}

// Sub-components
const CarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>
);

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const DashboardHeader = ({ sidebarOpen, setSidebarOpen, settings }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="material-icons">
            {sidebarOpen ? 'menu_open' : 'menu'}
          </span>
        </motion.button>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="material-icons text-gray-600 dark:text-gray-300">
              notifications
            </span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="material-icons text-white text-sm">person</span>
            </div>
            <span>Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatsOverview = () => {
  const stats = [
    { label: 'Total Cars', value: '124', icon: 'directions_car', change: '+12%' },
    { label: 'Available Cars', value: '89', icon: 'inventory_2', change: '+5%' },
    { label: 'Sold This Month', value: '35', icon: 'sell', change: '+23%' },
    { label: 'Pending Testimonials', value: '12', icon: 'rate_review', change: '-3%' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <span className="material-icons text-blue-600 dark:text-blue-300">
                  {stat.icon}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            'New Toyota Camry added to inventory',
            'Testimonial from John Doe approved',
            'BMW X5 marked as sold',
            'Monthly sales report generated'
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>{activity}</span>
              <span className="text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const CarForm = ({ formData, setFormData, onSubmit, onCancel, editing }) => {
  const updateSpecs = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [key]: value }
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">{editing ? 'Edit Car' : 'Add New Car'}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Make"
          value={formData.make}
          onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={formData.model}
          onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Engine"
          value={formData.specs.engine}
          onChange={(e) => updateSpecs('engine', e.target.value)}
          className="p-2 border rounded dark:bg-gray-700"
        />
        <select
          value={formData.specs.transmission}
          onChange={(e) => updateSpecs('transmission', e.target.value)}
          className="p-2 border rounded dark:bg-gray-700"
        >
          <option value="">Transmission</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
        <select
          value={formData.specs.fuelType}
          onChange={(e) => updateSpecs('fuelType', e.target.value)}
          className="p-2 border rounded dark:bg-gray-700"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'} Car
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

const CarGrid = ({ cars, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <AnimatePresence>
      {cars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-lg">{car.make} {car.model}</h4>
              <span className={`px-2 py-1 rounded text-xs ${
                car.status === 'available' ? 'bg-green-100 text-green-800' :
                car.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {car.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{car.year} • {car.specs.fuelType}</p>
            <p className="text-xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
            
            <div className="flex space-x-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(car)}
                className="flex-1 bg-blue-100 text-blue-600 py-2 rounded flex items-center justify-center"
              >
                <span className="material-icons text-sm">edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(car.id)}
                className="flex-1 bg-red-100 text-red-600 py-2 rounded flex items-center justify-center"
              >
                <span className="material-icons text-sm">delete</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const OperationCenter = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    make: '', model: '', year: new Date().getFullYear(), price: '',
    specs: { engine: '', transmission: '', fuelType: 'petrol', mileage: '', color: '' },
    images: [], status: 'available'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = new Car(
      editingCar ? editingCar.id : Date.now().toString(),
      formData.make,
      formData.model,
      formData.year,
      parseFloat(formData.price),
      formData.specs,
      formData.images,
      formData.status
    );

    if (editingCar) {
      setCars(cars.map(car => car.id === editingCar.id ? newCar : car));
      toast.success('Car updated successfully!');
    } else {
      setCars([...cars, newCar]);
      toast.success('Car added successfully!');
    }

    setShowForm(false);
    setEditingCar(null);
    setFormData({
      make: '', model: '', year: new Date().getFullYear(), price: '',
      specs: { engine: '', transmission: '', fuelType: 'petrol', mileage: '', color: '' },
      images: [], status: 'available'
    });
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      make: car.make, model: car.model, year: car.year, price: car.price,
      specs: car.specs, images: car.images, status: car.status
    });
    setShowForm(true);
  };

  const handleDelete = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
    toast.error('Car deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Operation Center</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="material-icons mr-2">add</span>
          Add New Car
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl"
            >
              <CarForm 
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingCar(null);
                }}
                editing={!!editingCar}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CarGrid 
        cars={cars}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

const TestimonyManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTestimonial = () => {
    const newTestimonial = new Testimonial(
      Date.now().toString(),
      'John Doe',
      5,
      'Excellent car and great service! Would definitely recommend.',
      'Toyota Camry',
      new Date(),
      false
    );
    setTestimonials([...testimonials, newTestimonial]);
    toast.success('New testimonial added for review!');
  };

  const approveTestimonial = (id) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, approved: true } : t));
    toast.success('Testimonial approved!');
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.error('Testimonial deleted!');
  };

  const filteredTestimonials = testimonials.filter(t => 
    filter === 'all' ? true : filter === 'approved' ? t.approved : !t.approved
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonials Management</h2>
        <div className="flex space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded dark:bg-gray-700"
          >
            <option value="all">All Testimonials</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTestimonial}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="material-icons mr-2">add</span>
            Add Sample
          </motion.button>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{testimonial.customerName}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{testimonial.carModel}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`material-icons text-sm ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="mt-2">{testimonial.comment}</p>
                </div>
                
                <div className="flex space-x-2">
                  {!testimonial.approved && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => approveTestimonial(testimonial.id)}
                      className="text-green-600"
                    >
                      <span className="material-icons">check</span>
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="text-red-600"
                  >
                    <span className="material-icons">delete</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SettingsPanel = ({ settings, onUpdate }) => {
  const handleSettingChange = (key, value) => {
    onUpdate({ ...settings, [key]: value });
    toast.success('Settings updated successfully!');
  };

  const handleEmailPreferenceChange = (key, value) => {
    onUpdate({
      ...settings,
      emailPreferences: { ...settings.emailPreferences, [key]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Enable notifications</span>
            <ToggleSwitch
              enabled={settings.notifications}
              onChange={(val) => handleSettingChange('notifications', val)}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Theme</span>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="p-2 border rounded dark:bg-gray-700"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Language</span>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="p-2 border rounded dark:bg-gray-700"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Email Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Marketing emails</span>
            <ToggleSwitch
              enabled={settings.emailPreferences.marketing}
              onChange={(val) => handleEmailPreferenceChange('marketing', val)}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span>Update notifications</span>
            <ToggleSwitch
              enabled={settings.emailPreferences.updates}
              onChange={(val) => handleEmailPreferenceChange('updates', val)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Dashboard Component
export const Dashboard = ({ settings, onSettingsUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'operations', label: 'Operation Center', icon: 'build' },
    { id: 'testimonials', label: 'Testimonials', icon: 'rate_review' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="bg-white dark:bg-gray-800 shadow-xl w-64 fixed h-full z-30"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <CarIcon className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">AutoDealer Pro</span>
          </div>
          
          <nav className="mt-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="material-icons mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          settings={settings}
        />
        
        <main className="p-6">
          {activeTab === 'overview' && <StatsOverview />}
          {activeTab === 'operations' && <OperationCenter />}
          {activeTab === 'testimonials' && <TestimonyManager />}
          {activeTab === 'settings' && (
            <SettingsPanel settings={settings} onUpdate={onSettingsUpdate} />
          )}
        </main>
      </div>
    </div>
  );
};

// Main App Component
export const SettingsApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light',
    language: 'en',
    emailPreferences: { marketing: true, updates: true }
  });

  const views = {
    dashboard: <Dashboard settings={settings} onSettingsUpdate={setSettings} />,
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {views[currentView]}
        </motion.div>
      </AnimatePresence>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={settings.theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
};

