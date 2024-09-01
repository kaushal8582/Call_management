import React, { useState, useEffect } from 'react';
import deleteImg from "../../assets/delete.svg";
import toast from 'react-hot-toast';
import { BASE_URL } from '../../component/URL';

const StudentList = ({ allStudent }) => {
  const [students, setStudents] = useState(allStudent);

  // Ensure the state is updated when the prop changes
  useEffect(() => {
    console.log(allStudent);
    
    setStudents(allStudent);
  }, [allStudent]);

  const handelDelete = async (id, index) => {
    try {
      const worker = JSON.parse(localStorage.getItem("worker"));
      const accessToken = worker?.accessToken;
      const response = await fetch(`${BASE_URL}/collegeBuddy/api/v1/student/delete-student/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });

      if (response.ok) {
        // Remove the student from the state
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);

        toast.success("Student deleted successfully");
      } else {
        toast.error("Failed to delete student");
      }

    } catch (error) {
      console.log(error);
      toast.error("Error: Student not deleted");
    }
  };

  return (
    <div className="bg-gray-500 w-full min-h-screen p-4">
      <table className="w-full text-white bg-gray-700">
        <thead>
          <tr className="border-t-2 border-gray-950 bg-blue-600">
            <th className="p-2">Student Id</th>
            <th className="p-2">Name</th>
            <th className="p-2">College</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Call Status</th>
            <th className="p-2">Interested</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Worker</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id} className="border-t-2 border-gray-950">
                <td className="p-2">{student.studentid}</td>
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.collegeName}</td>
                <td className="p-2">{student.phoneNumber}</td>
                <td className="p-2">{student.callStatus}</td>
                <td className="p-2 max-w-xs truncate">{student.interests}</td>
                <td className="p-2">{student.reason}</td>
                <td className="p-2">
                  {student.workerId && student.workerId.name ? student.workerId.name : "Not allocated"}
                </td>
                <td onClick={() => handelDelete(student._id, index)}>
                  <img className='h-8 cursor-pointer' src={deleteImg} alt="Delete" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center p-4">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
  