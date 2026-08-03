import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    employees: "",
    country: "",
    currency: "USD",
    financialYear: "Jan-Dec",
    description: "",
    ownerName: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    async function checkCompany() {
      if (!user) return;
      try {
        const docRef = doc(db, "companies", user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          navigate("/"); // already onboarded
        }
      } catch (error) {
        console.error("Error checking company on onboarding:", error);
      } finally {
        setLoading(false);
      }
    }
    checkCompany();
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    try {
      // Save to Firestore
      const companyRef = doc(db, "companies", user.id);
      await setDoc(companyRef, {
        ...formData,
        employees: parseInt(formData.employees) || 0,
        revenue: 0,
        expenses: 0,
        profit: 0,
        sales_growth: 0,
        customer_satisfaction: 0,
        employee_satisfaction: 0,
        pending_tasks: 0,
        createdAt: new Date().toISOString()
      });
      
      toast.success("Company profile created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving company", error);
      toast.error(`Failed to create company profile: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#0B0B0F] text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#13131A] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <Building2 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Company Setup</h1>
            <p className="text-gray-400 mt-1">Tell us about your business to get started</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Company Name</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="Acme Corp" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Industry</label>
              <input type="text" name="industry" required value={formData.industry} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="Technology" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Employees</label>
              <input type="number" name="employees" required value={formData.employees} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="10" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Country</label>
              <input type="text" name="country" required value={formData.country} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="USA" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Business Description</label>
            <textarea name="description" required value={formData.description} onChange={handleChange} rows="3" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none resize-none" placeholder="What does your company do?"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Owner Name</label>
              <input type="text" name="ownerName" required value={formData.ownerName} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="Your Name" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" placeholder="+1 234 567 890" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl py-4 flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? "Saving..." : "Complete Setup"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
