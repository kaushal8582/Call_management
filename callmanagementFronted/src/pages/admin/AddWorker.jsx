import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../component/URL";

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker", // Default value set to 'worker'
    start:null,
    end:null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to the backend
    try {
      const worker = JSON.parse(localStorage.getItem("worker"));
      const accessToken = worker?.accessToken;
      const response = await fetch(
        `${BASE_URL}/collegeBuddy/api/v1/workers/rejister-worker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            start:formData.start,
            end:formData.end,
          }),
        }
      );

      if (response.ok) {
        toast.success("Add worker successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "worker",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Add worker failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10  bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
        Add Worker
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Start:
          </label>
          <input
            type="number"
            id="number"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            End:
          </label>
          <input
            type="number"
            id="number"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700 font-medium">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        >
          Add Worker
        </button>
      </form>
    </div>
  );
};

export default AddWorker;
