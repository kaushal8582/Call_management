import React, { useEffect, useState } from "react";
import TopSection from "./TopSection";
import StudentList from "./StudentList";
import AddWorker from "./AddWorker";
import toast from "react-hot-toast";
import { BASE_URL } from "../../component/URL";
import Import from "./Import";
import AllWorkers from "./AllWorkers";

const Admin = () => {
  const [state, setState] = useState("studentList");
  const [allStudent,setAllStudent] = useState('')
  const [allWorker,setAllWorker] = useState('')

  useEffect(() => {
    const getAllStudentInfo = async () => {
      try {
        const worker = JSON.parse(localStorage.getItem("worker"));
        const accessToken = worker?.accessToken;

        const response = await fetch(`${BASE_URL}/collegeBuddy/api/v1/student/get-all-student`,{
          method:"GET",
          headers:{
            Authorization: `Bearer ${accessToken}`,
          }
        })

        const data = await response.json();
        if(data.statusCode==200){
          setAllStudent(data?.data);
          toast.success("Get all data")
        }
      } catch (error) {
        console.log(error);

        toast.error("fetching failed student data");
      }
    };
    getAllStudentInfo();
  }, []);

  useEffect(() => {
    const getAllWorkerInfo = async () => {
      try {
        const worker = JSON.parse(localStorage.getItem("worker"));
        const accessToken = worker?.accessToken;

        const response = await fetch(`${BASE_URL}/collegeBuddy/api/v1/workers/findall-worker`,{
          method:"GET",
          headers:{
            Authorization: `Bearer ${accessToken}`,
          }
        })

        const data = await response.json();
        console.log(data.data);
        if(data.statusCode==200){
          setAllWorker(data?.data);
          toast.success("Get all data")
        }
      } catch (error) {
        console.log(error);
        toast.error("fetching failed Worker data data");
      }
    };
    getAllWorkerInfo();
  }, []);

  return (
    <div>
      <TopSection setState={setState} />
      {state == "studentList" && <StudentList allStudent={allStudent} />}
      {state == "addworker" && <AddWorker />}
      {state=="import" && <Import/>}
      {state=="allworker" && <AllWorkers allworkers={allWorker} />}
    </div>
  );
};

export default Admin;
