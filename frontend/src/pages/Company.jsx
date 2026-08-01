import { useEffect, useState } from "react";
import { Building, MapPin, Calendar, FileText } from "lucide-react";
import { getDashboardData } from "../services/api";

export default function Company() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        console.error("Failed to load company data", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Company Profile</h1>
        <p className="text-slate-400">View and manage company details</p>
      </div>

      {data ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
            <div className="bg-blue-500/20 p-4 rounded-2xl">
              <Building size={48} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{data.company_name}</h2>
              <p className="text-lg text-blue-400">{data.industry}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-slate-400 mt-1" size={24} />
                <div>
                  <h3 className="text-sm text-slate-400 uppercase tracking-wider">Location</h3>
                  <p className="text-white text-lg">{data.location || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="text-slate-400 mt-1" size={24} />
                <div>
                  <h3 className="text-sm text-slate-400 uppercase tracking-wider">Founded Year</h3>
                  <p className="text-white text-lg">{data.founded_year || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FileText className="text-slate-400 mt-1" size={24} />
                <div>
                  <h3 className="text-sm text-slate-400 uppercase tracking-wider">Description</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {data.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">Loading company profile...</div>
      )}
    </div>
  );
}