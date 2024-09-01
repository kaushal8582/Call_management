import React, { useEffect, useState } from "react";
import useStudentData from "../hooks/useStudentData";
import arrow from "../assets/arrow.svg";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "../component/context/myContext";

const Card = () => {
  const context = useContext(mycontext);
  const { index, setIndex, filterStudent } = context;

  const { id } = useParams();

  const {
    fullfilledStudents,
    interestLevel,
    setInterestLevel,
    callStatus,
    setCallStatus,
    reason,
    setReason,
    response1,
    setResponse,
    followUpDate,
    setFollowUpDate,
    progress,
    handleSubmit,
  } = useStudentData();

//   const [currentIndex, setCurrentIndex] = useState(0);

  // Handle navigation
  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < filterStudent.length - 1) {
      setIndex(index + 1);
    }
  };

  // Current student data
  let currentStudent =null
  if( filterStudent&& filterStudent.length>0){
     currentStudent = filterStudent[index];

  }

  useEffect(()=>{
    console.log(currentStudent);
    console.log( "card index", index);
  },[])

//   useEffect(() => {
//     if (fullfilledStudents.length > 0) {
//       setCurrentIndex(0);
//       console.log(fullfilledStudents);
//     }
//   }, [fullfilledStudents]);

  useEffect(() => {
    if (currentStudent) {
      // Ensure that all necessary state variables are set
      console.log("current student ", currentStudent);
      
      setInterestLevel(currentStudent.interests || "Low"); // Default to empty or appropriate default value
      setCallStatus(currentStudent.callStatus || "");
      setReason(currentStudent.reason || "");
      setResponse(currentStudent.response || "");
      // setFollowUpDate(
      //   new Date(currentStudent.followUpDate).toISOString().slice(0, 16) || ""
      // );

      if (currentStudent.followUpDate) {
        const date = new Date(currentStudent.followUpDate);
        const formattedDate = date.toISOString().substring(0, 16); // Format for datetime-local input
        setFollowUpDate(formattedDate);
        console.log("formated Date ", formattedDate);
        
      } else {
        setFollowUpDate("");
      }
    }
  }, [currentStudent,index]);


  const getBgColor = (level) => {
    switch (level) {
      case "Low":
        return "bg-yellow-500";
      case "Mid":
        return "bg-green-500";
      case "High":
        return "bg-orange-500";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="w-full min-h-screen grid place-items-center">
      {currentStudent ? (
        <div className="w-[320px] bg-white rounded-lg p-3">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="w-full border-dotted border-2 rounded-lg mt-6">
            <div className="w-full flex h-10 ">
              <h4 className="w-1/2 grid place-items-center h-full border-r-2 border-dotted">
                {currentStudent.studentid}
              </h4>
              <h4 className="w-1/2 text-center grid place-items-center">
                {currentStudent.collegeName}
              </h4>
            </div>
            <div className="w-full grid place-items-center text-center border-dotted h-10 border-t-2">
              {currentStudent.name}
            </div>
          </div>

          <div className="w-full flex justify-between mt-5">
            <a
              className="rounded-full w-[48%] h-9 bg-orange-400 grid place-items-center"
              href={`tel:${currentStudent.phoneNumber}`}
            >
              Call
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${currentStudent.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid place-items-center rounded-full w-[48%] h-9 bg-green-500"
            >
              WhatsApp
            </a>
          </div>
          <div className="w-full mt-7 h-[1px] bg-[#5f5f5f49] rounded-xl"></div>
          <h4 className="text-center w-full mt-3">Interest Level</h4>
          <div className="flex justify-between mt-2">
            <label
              className={`w-20 h-10 border-2 rounded-lg grid place-items-center cursor-pointer ${getBgColor(
                interestLevel === "Low" ? "Low" : ""
              )}`}
            >
              <input
                type="radio"
                name="interestLevel"
                value="Low"
                checked={interestLevel === "Low"}
                onChange={(e) => setInterestLevel(e.target.value)}
                className="hidden"
              />
              Low
            </label>
            <label
              className={`w-20 h-10 border-2 rounded-lg grid place-items-center cursor-pointer ${getBgColor(
                interestLevel === "Mid" ? "Mid" : ""
              )}`}
            >
              <input
                type="radio"
                name="interestLevel"
                value="Mid"
                checked={interestLevel === "Mid"}
                onChange={(e) => setInterestLevel(e.target.value)}
                className="hidden"
              />
              Mid
            </label>
            <label
              className={`w-20 h-10 border-2 rounded-lg grid place-items-center cursor-pointer ${getBgColor(
                interestLevel === "High" ? "High" : ""
              )}`}
            >
              <input
                type="radio"
                name="interestLevel"
                value="High"
                checked={interestLevel === "High"}
                onChange={(e) => setInterestLevel(e.target.value)}
                className="hidden"
              />
              High
            </label>
          </div>

          {/* <h4 className="text-center w-full mt-3">Call Status</h4> */}
          <div className="mb-4 mt-4">
            <select
              className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={callStatus}
              onChange={(e) => setCallStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="fullfill">FullFill</option>
              <option value="enrolled">Enrolled</option>
              <option value="cnt">Call Not received</option>
              <option value="notinterested">Not Interested</option>
              <option value="exceptions">Exceptions</option>
            </select>
          </div>

          <div className="mb-4">
            <select
              className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Issues & Problems</option>
              <option value="Online Samajh Nahi Aata hai">
                Online Samajh Nahi Aata hai
              </option>
              <option value="Data Nahi Rahta hai">Data Nahi Rahta hai</option>
              <option value="Financial Problem">Financial Problem</option>
              <option value="Parental Problem">Parental Problem</option>
              <option value="Offline Prefer Karte hai">
                Offline Prefer Karte hai
              </option>
              <option value="Field Change">Field Change</option>
              <option value="Isme Acha Nahi Lagta hai">
                Isme Acha Nahi Lagta hai
              </option>
              <option value="Admission Nahi Liya tha">
                Admission Nahi Liya tha
              </option>
              <option value="Course Complete Nahi Ho Raha Hai">
                Course Complete Nahi Ho Raha Hai
              </option>
              <option value="Exam Clear Nahi Ho Raha Hai">
                Exam Clear Nahi Ho Raha Hai
              </option>
              <option value="Exam Fee Bhara Nahi Gya hai">
                Exam Fee Bhara Nahi Gya hai
              </option>
              <option value="Result Mein Fail Hai">Result Mein Fail Hai</option>
            </select>
          </div>

          {/* <h4 className="text-center w-full mt-3">Response</h4> */}
          <textarea
            value={response1}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full border-2 rounded-lg mt-2 p-1"
          />

          {/* <h4 className="text-center w-full mt-3">Follow Up Date</h4> */}
          <input
            type="datetime-local"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full border-2 rounded-lg mt-2 p-1"
          />

          <div className="flex items-center justify-between gap-4 mt-5">
            <button
              className="rounded-lg w-[35%] h-9 grid place-items-center border-2 border-black bg-white shadow-xl"
              onClick={handlePrevious}
              disabled={index === 0}
            >
              <img src={arrow} alt="" />
            </button>
            <button
              className="w-[80%] mt-3 h-9 bg-blue-500 text-white rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="rounded-lg w-[35%] grid place-items-center h-9 border-2 border-black bg-white shadow-xl"
              onClick={handleNext}
              disabled={index === filterStudent.length - 1}
            >
              <img className="rotate-180" src={arrow} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Card;
