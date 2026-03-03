import { useEffect, useState } from "react";
import API from "../api/api";
import Card from "../components/Card";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { Users, CheckCircle, XCircle } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/attendance/dashboard/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Employees",
      value: data?.total_employees ?? "--",
      icon: Users,
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      label: "Present Today",
      value: data?.present_today ?? "--",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      label: "Absent Today",
      value: data?.absent_today ?? "--",
      icon: XCircle,
      gradient: "from-rose-500 to-red-500",
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="mb-14">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 mt-3 text-sm">
          Real-time workforce analytics & attendance insights.
        </p>
      </div>

      <ErrorAlert message={error} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:scale-[1.03] transition duration-300 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm tracking-wide">
                    {stat.label}
                  </p>
                  <h2 className="text-5xl font-bold mt-4 text-white">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                >
                  <Icon size={30} className="text-white" />
                </div>
              </div>

              {/* Subtle Glow Effect */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-10 bg-gradient-to-br ${stat.gradient}`}
              />
            </div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div className="mt-16">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-10 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            System Overview
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            The HRMS platform centralizes employee records and attendance
            tracking into a streamlined dashboard. Administrators gain
            real-time operational visibility to ensure workforce efficiency,
            accountability, and accurate reporting.
          </p>
        </div>
      </div>
    </>
  );
}