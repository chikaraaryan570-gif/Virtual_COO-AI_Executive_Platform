import { FileText, Download, Filter } from "lucide-react";

export default function Reports() {
  const reports = [
    { id: 1, title: "Q2 Financial Summary", type: "Finance", date: "2023-07-01", size: "2.4 MB" },
    { id: 2, title: "Annual Employee Satisfaction Survey", type: "HR", date: "2023-06-15", size: "1.1 MB" },
    { id: 3, title: "Monthly Sales Performance - June", type: "Sales", date: "2023-07-05", size: "3.5 MB" },
    { id: 4, title: "Server Migration Post-Mortem", type: "Operations", date: "2023-05-20", size: "850 KB" },
    { id: 5, title: "Q3 Marketing Strategy", type: "Sales", date: "2023-06-30", size: "5.2 MB" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white">Reports</h1>
          <p className="text-slate-400">View and download business reports</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800 text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Report Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Department</th>
              <th scope="col" className="px-6 py-4 font-medium">Date</th>
              <th scope="col" className="px-6 py-4 font-medium">Size</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                      <FileText size={20} />
                    </div>
                    <span className="font-medium text-white">{report.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-slate-800 px-3 py-1 rounded-full text-xs border border-slate-700">
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4">{report.date}</td>
                <td className="px-6 py-4">{report.size}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                    <Download size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}