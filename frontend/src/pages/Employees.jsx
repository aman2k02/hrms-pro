import { useEffect, useState } from "react";
import API from "../api/api";
import Card from "../components/Card";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { Trash2 } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEmployees = () => {
    setLoading(true);
    API.get("/employees/")
      .then((res) => {
        setEmployees(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    API.post("/employees/", form)
      .then(() => {
        setSuccess("Employee added successfully.");
        setForm({
          employee_id: "",
          full_name: "",
          email: "",
          department: "",
        });
        fetchEmployees();
      })
      .catch((err) => setError(err));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    API.delete(`/employees/${id}/`)
      .then(() => {
        setSuccess("Employee deleted successfully.");
        fetchEmployees();
      })
      .catch((err) => setError(err));
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">
          Employee Management
        </h1>
        <p className="text-gray-500 mt-2">
          Add, view and manage company employees.
        </p>
      </div>

      {/* Add Employee Form */}
      <Card
        title="Add Employee"
        subtitle="Create a new employee record"
      >
        <ErrorAlert message={error} />
        <SuccessAlert message={success} />

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 mt-6"
        >
          {Object.keys(form).map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-600 mb-2 capitalize"
              >
                {field.replace("_", " ")}
              </label>

              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2.5 
                           focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 
                           focus:outline-none transition-all duration-200"
                required
                autoComplete="off"
              />
            </div>
          ))}

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg 
                         hover:bg-blue-700 hover:shadow-md 
                         transition-all duration-300 font-medium"
            >
              Add Employee
            </button>
          </div>
        </form>
      </Card>

      {/* Employee Table */}
      <div className="mt-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : employees.length === 0 ? (
          <EmptyState message="No employees found." />
        ) : (
          <Card
            title="Employee List"
            subtitle="All registered employees"
          >
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 font-semibold text-gray-600 text-left">
                      Employee ID
                    </th>
                    <th className="px-4 font-semibold text-gray-600 text-left">
                      Full Name
                    </th>
                    <th className="px-4 font-semibold text-gray-600 text-left">
                      Email
                    </th>
                    <th className="px-4 font-semibold text-gray-600 text-left">
                      Department
                    </th>
                    <th className="px-4 font-semibold text-gray-600 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b hover:bg-blue-50 transition-all duration-200"
                    >
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {emp.employee_id}
                      </td>
                      <td className="px-4 text-gray-800">
                        {emp.full_name}
                      </td>
                      <td className="px-4 text-gray-600">
                        {emp.email}
                      </td>
                      <td className="px-4 text-gray-700">
                        {emp.department}
                      </td>
                      <td className="px-4 text-right">
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="inline-flex items-center gap-1 
                                     px-3 py-1.5 rounded-md 
                                     text-red-600 hover:bg-red-50 
                                     transition-all duration-200 font-medium"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}