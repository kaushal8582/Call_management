import React, { useEffect, useState } from "react";
import deleteImg from "../../assets/delete.svg";
import editImg from "../../assets/edit.svg";
import toast from "react-hot-toast";
import { BASE_URL } from "../../component/URL";

const AllWorkers = ({ allworkers }) => {
  const [workers, setWorkers] = useState(allworkers);
  const [password, setPassword] = useState("");
  const [start, setStart] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [end, setEnd] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    setWorkers(allworkers);
  }, [allworkers]);

  const handleDelete = async (id, index) => {
    try {
      const worker = JSON.parse(localStorage.getItem("worker"));
      const accessToken = worker?.accessToken;
      const response = await fetch(
        `${BASE_URL}/collegeBuddy/api/v1/workers/delete-worker/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "GET",
        }
      );

      if (response.ok) {
        const updatedWorker = [...workers];
        updatedWorker.splice(index, 1);
        setWorkers(updatedWorker);
        toast.success("Deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    console.log(id);

    const workerToEdit = workers.find((worker) => worker._id === id);
    console.log(workerToEdit);

    if (workerToEdit) {
      setSelectedWorker(workerToEdit);
      setPassword("");
      setName(workerToEdit.name);
      setEmail(workerToEdit.email);
      setStart(workerToEdit.start_range ||'' );
      setEnd(workerToEdit.end_range || '');
    }
  };

  const handelCloseBtn = ()=>{
    setSelectedWorker(null);
    setName('');
    setEmail("");
    setStart('');
    setEnd('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as updating the worker
    if (selectedWorker) {
      // Example: Update logic here
      console.log("Updating worker:", selectedWorker._id, password, start, end);

      try {
        const worker = JSON.parse(localStorage.getItem("worker"));
        const accessToken = worker?.accessToken;
        const response = await fetch(`${BASE_URL}/collegeBuddy/api/v1/workers/update-worker/${selectedWorker._id}`,{
          headers:{
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          method:"POST",
          body:JSON.stringify({password,start,end})
        })

        const data = await response.json()
        if(response.ok){
          setSelectedWorker(null);
          setPassword("");
          setStart("");
          setEnd("");
          toast.success("Worker updated successfully");
        }

      } catch (error) {
        console.log(error);
        toast.error("update failed")
        
      }

      // Reset form
     
    }
  };

  return (
    <div className="bg-gray-500 w-full min-h-screen p-4">
      {selectedWorker && (
        <form
          onSubmit={handleSubmit}
          className="w-[320px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 rounded-lg bg-white shadow-lg mb-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">
            Update Form
          </h2>

          <h2 onClick={handelCloseBtn} className="text-red-500 font-bold text-[20px] absolute top-3 cursor-pointer right-4"  >X</h2>

          <p>{name}</p>
          <p>{email}</p>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Start Field */}
          <div className="mb-4">
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-600"
            >
              Start
            </label>
            <input
              type="number"
              id="start"
              name="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Field */}
          <div className="mb-4">
            <label
              htmlFor="end"
              className="block text-sm font-medium text-gray-600"
            >
              End
            </label>
            <input
              type="number"
              id="end"
              name="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </form>
      )}

      <table className="w-full text-white bg-gray-700">
        <thead>
          <tr className="border-t-2 border-gray-950 bg-blue-600">
            <th className="p-2">So N.</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Range</th>
            <th className="p-2">Delete</th>
            <th className="p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {workers.length > 0 ? (
            workers.map((worker, index) => (
              <tr key={worker._id} className="border-t-2 border-gray-950">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{worker.name}</td>
                <td className="p-2">{worker.email}</td>
                <td className="p-2">{worker.role}</td>
                <td className="p-2">
                  {worker.start_range} - {worker.end_range}
                </td>
                <td onClick={() => handleDelete(worker._id, index)}>
                  <img
                    className="h-8 cursor-pointer"
                    src={deleteImg}
                    alt="Delete"
                  />
                </td>
                <td onClick={() => handleEdit(worker._id)}>
                  <img
                    className="h-8 cursor-pointer"
                    src={editImg}
                    alt="Edit"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No workers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllWorkers;
