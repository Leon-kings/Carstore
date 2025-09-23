/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// components
import { Navbar } from "./components/navbar/Navbar";
import { About } from "./pages/about/About";
import { Team } from "./pages/team/Team";
import { Services } from "./pages/services/Services";
import { NewFeatures } from "./pages/features/Features";
import { Products } from "./pages/products/Products";
import Home from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { Testimonials } from "./pages/testimony/Testimony";
import { FAQ } from "./components/faq/FAQ";
import { Dashboard } from "./components/dashboard/admin/index/Dashboard";
import { UserManagement } from "./components/dashboard/admin/management/UserManagement";
import { Settings } from "./components/dashboard/admin/settings/Settings";
import { CarsDashboard } from "./components/dashboard/admin/management/CarsManagement";
import { ContactManagement } from "./components/dashboard/admin/management/ContactManagement";
import { TestimonyManagement } from "./components/dashboard/admin/management/TestimonyManagement";
import { PaymentManagement } from "./components/dashboard/admin/management/PaymentManagement";
import { SubscriptionManagement } from "./components/dashboard/admin/management/SubscriptionManagement";

// Create Auth Context
const AuthContext = createContext();

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/" replace />;
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is signed in on app load (from localStorage)
    const savedUser = localStorage.getItem("user");
    const savedAuthStatus = localStorage.getItem("isSignedIn");

    if (savedUser && savedAuthStatus === "true") {
      setUser(JSON.parse(savedUser));
      setIsSignedIn(true);
    }
  }, []);

  const signIn = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isSignedIn", "true");
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isSignedIn");
  };

  return (
    <AuthContext.Provider value={{ user, isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function App() {
  return (
    <AuthProvider>
      <div className="w-full">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/features" element={<NewFeatures />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              // <PrivateRoute>
                <UserManagement />
              // </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              // <PrivateRoute>
              <Settings />
              // </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/cars"
            element={
              // <PrivateRoute>
              <CarsDashboard />
              // </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/contacts"
            element={
              // <PrivateRoute>
              <ContactManagement />
              // </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/testimony"
            element={
              // <PrivateRoute>
              <TestimonyManagement />
              // </PrivateRoute>
            }
          />
                    <Route
            path="/dashboard/payment"
            element={
              // <PrivateRoute>
              <PaymentManagement />
              // </PrivateRoute>
            }
          />
                              <Route
            path="/dashboard/subscription"
            element={
              // <PrivateRoute>
              <SubscriptionManagement />
              // </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}
