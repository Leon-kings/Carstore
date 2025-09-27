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
import { UserDashboard } from "./components/dashboard/users/index/UserDashboard";
import { toast } from "react-toastify";
import { UndefinedPage } from "./notfound/Notfound";
import { UserTestimonyManagement } from "./components/dashboard/users/components/testimony/UserTestimonyManagement";
import { UserCarsDashboard } from "./components/dashboard/users/components/create/UserCarsManagement";
import { UserContactManagement } from "./components/dashboard/users/components/contact/UserContactManagement";
import { UserPaymentManagement } from "./components/dashboard/users/components/payment/UserPaymentManagement";
import { UserSettings } from "./components/dashboard/users/components/settings/UserSetting";

// Create Auth Context
const AuthContext = createContext();

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
          <Route path="*" element={<UndefinedPage />} />
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
            path="/728289/292jh020-7"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/02jw829/29910"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/78292"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/02000"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/7281/191"
            element={
              <PrivateRoute>
                <CarsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/72891"
            element={
              <PrivateRoute>
                <ContactManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/728981"
            element={
              <PrivateRoute>
                <TestimonyManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/payment"
            element={
              <PrivateRoute>
                <PaymentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/subscription"
            element={
              <PrivateRoute>
                <SubscriptionManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/8292/Testimony"
            element={
              <PrivateRoute>
                <UserTestimonyManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/8292/cars/post"
            element={
              <PrivateRoute>
                <UserCarsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/8292/contacts"
            element={
              <PrivateRoute>
                <UserContactManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/8292/payments"
            element={
              <PrivateRoute>
                <UserPaymentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/829/hu0/settings"
            element={
              <PrivateRoute>
                <UserSettings />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}
