import React, { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../component/URL";
import { mycontext } from "../component/context/myContext";
import toast from "react-hot-toast";

const FullFill = () => {
  const context = useContext(mycontext);
  const { setLoader } = context;

  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [callStatus, setCallStatus] = useState("fullfill"); // Default to "fullfill"
  const [response, setResponse] = useState("");
  const [reason, setReason] = useState("");
  const [interests, setInterests] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const getAllUser = async (id) => {
      try {
        setLoader(true);
        const worker = JSON.parse(localStorage.getItem("worker"));
        const accessToken = worker?.accessToken;
        const response = await fetch(
          `${BASE_URL}/collegeBuddy/api/v1/student/find-my-student/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
          }
        );

        const data = await response.json();
        if (response.ok) {
          const value = data?.data;
          setStudents(
            value.filter((student) => student.callStatus === "fullfill")
          );
        }

        if (students.length > 0) {
          const currentStudent = students[0];
          setCurrentIndex(0);
          setCallStatus(currentStudent.callStatus);
          setResponse(currentStudent.response);
          setReason(currentStudent.reason);
          setInterests(currentStudent.interests);
          setFollowUpDate(
            new Date(currentStudent.followUpDate).toISOString().slice(0, 16)
          );
          setId(currentStudent._id);
        }
      } catch (error) {
        console.log("Fetching student error:", error);
      } finally {
        setLoader(false);
      }
    };

    const data = JSON.parse(localStorage.getItem("worker"));
    getAllUser(data?.data?._id);
  }, [setLoader]);

  useEffect(() => {
    if (students.length > 0 && students[currentIndex]) {
      const currentStudent = students[currentIndex];
      setCallStatus(currentStudent.callStatus);
      setResponse(currentStudent.response);
      setReason(currentStudent.reason);
      setInterests(currentStudent.interests);
      setFollowUpDate(
        new Date(currentStudent.followUpDate).toISOString().slice(0, 16)
      );
      setId(currentStudent._id);
    }
  }, [currentIndex, students]);

  const handleNext = () => {
    if (currentIndex < students.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const worker = JSON.parse(localStorage.getItem("worker"));
      const accessToken = worker?.accessToken;
      const responseData = await fetch(
        `${BASE_URL}/collegeBuddy/api/v1/student/update-student-response/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body: JSON.stringify({
            callStatus: callStatus,
            response: response,
            reason: reason,
            interests: interests,
            followUpDate: followUpDate,
          }),
        }
      );

      if (responseData.ok) {
        toast.success("Data updated successfully");
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id
              ? {
                  ...student,
                  callStatus,
                  response,
                  reason,
                  interests,
                  followUpDate,
                }
              : student
          )
        );
      } else {
        toast.error("Failed to update data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update data");
    }
  };

  const currentStudent = students[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {currentStudent ? (
        <form
          className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-10" >
          <h3 className="text-xl font-semibold">Name: {currentStudent.name}</h3>
          <h3 className="text-xl font-semibold">
            College Name: {currentStudent.collegeName}
          </h3>
          </div>
          <h3 className="text-xl font-semibold">
            Phone No: {currentStudent.phoneNumber}
          </h3>
          <h3 className="text-xl font-semibold">Call Status: Full fill</h3>

          <div className="w-full">
            <label className="block text-lg font-medium mb-2">Response</label>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-md"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            ></textarea>
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium mb-2">Reason</label>
            <select
              className="w-full h-10 p-2 border-2 border-gray-300 rounded-md"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              <option value="Online Samajh Nahi Aata hai">
                Online Samajh Nahi Aata hai
              </option>
              <option value="Data Nahi Rahta hai">Data Nahi Rahta hai</option>
              <option value="Financial Problem">Financial Problem</option>
              <option value="Timing Problem">Timing Problem</option>
              <option value="Continue 2 Hours Nahi kar Sakte hai">
                Continue 2 Hours Nahi kar Sakte hai
              </option>
              <option value="Padhne ka Man Nahi Karta Hai">
                Padhne ka Man Nahi Karta Hai
              </option>
              <option value="Youtube se Class Liye Hai">
                Youtube se Class Liye Hai
              </option>
              <option value="Offline Me Jyada Samjh Aata Hai">
                Offline Me Jyada Samjh Aata Hai
              </option>
              <option value="Free me Mil Hi Jata Hai">
                Free me Mil Hi Jata Hai
              </option>
              <option value="Teacher Manipulate Kar Deta Hai">
                Teacher Manipulate Kar Deta Hai
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium mb-2">Interests</label>
            <select
              className="w-full h-10 p-2 border-2 border-gray-300 rounded-md"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            >
              <option value="">Select Interests</option>
              <option value="Highly Intrested">Highly Interested</option>
              <option value="Interested">Interested</option>
              <option value="Average Interested">Average Interested</option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium mb-2">
              Follow Up Date
            </label>
            <input
              className="w-full h-10 p-2 border-2 border-gray-300 rounded-md"
              type="datetime-local"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>

          <button
            className="bg-[#2bbffa] text-white py-2 rounded-md font-semibold text-lg"
            type="submit"
          >
            Update
          </button>
        </form>
      ) : (
        <p className="text-xl font-semibold">No more students to show.</p>
      )}

      <div className="w-full flex items-center justify-between mt-6 max-w-xl">
        <button
          onClick={handlePrevious}
          className="bg-white border-2 border-gray-300 py-2 px-6 rounded-md font-semibold text-lg"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-[#ffd77b] py-2 px-6 rounded-md font-semibold text-lg"
          disabled={currentIndex >= students.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FullFill;
