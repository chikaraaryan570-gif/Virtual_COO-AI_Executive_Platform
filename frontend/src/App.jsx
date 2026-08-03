import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./services/firebase";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Company from "./pages/Company";
import Finance from "./pages/Finance";
import HR from "./pages/HR";
import Sales from "./pages/Sales";
import Operations from "./pages/Operations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [companyLoading, setCompanyLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    async function checkCompany() {
      if (user) {
        try {
          const docRef = doc(db, "companies", user.id);
          const snap = await getDoc(docRef);
          setHasCompany(snap.exists());
        } catch (error) {
          console.error("Error checking company:", error);
          setHasCompany(false);
        }
      }
      setCompanyLoading(false);
    }
    if (!loading) {
      checkCompany();
    }
  }, [user, loading, location.pathname]);

  if (loading || (user && companyLoading)) return <div className="h-screen w-full flex items-center justify-center bg-[#0B0B0F] text-white">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCompany && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/company" element={<Company />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/hr" element={<HR />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;