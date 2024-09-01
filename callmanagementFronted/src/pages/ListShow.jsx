  import React, { useState, useEffect, useContext } from "react";
  import arrow from "../assets/arrow.svg";
  import useStudentData from "../hooks/useStudentData";
  import { mycontext } from "../component/context/myContext";
  import { Link, useNavigate } from "react-router-dom";

  const ListShow = () => {
    const navigate = useNavigate()
    const context = useContext(mycontext);
    const { filter, setFilter,setFilterStudents ,filterStudent,setIndex} = context;
    
    // Initialize loading state
    const [loading, setLoading] = useState(true);

    const { students } = useStudentData();

    // Use useEffect to handle loading state
    useEffect(() => {
      if (students.length > 0) {
        setLoading(false); // Set loading to false when data is loaded
      }
    }, [students]);

    // Filter the tasks based on the filter state
    let filteredTask = []
    useEffect(() => {
      filteredTask = filter === "all" ? students : students.filter((stu) => stu.callStatus === filter);
      if(filter=="fullfill"){
          filteredTask.sort((a,b)=>new Date(a.followUpDate) -  new Date(b.followUpDate))
      }
      setFilterStudents(filteredTask)
      setIndex(0)
    }, [filter, students, setFilterStudents]);

    // console.log("filteredTask", filteredTask);
    console.log(students);
    
    const handelItemClick = (index)=>{
      console.log('clicking',index);
      setIndex(index)
      navigate(`/card`)
    }

    return (
      <div className="w-full min-h-screen grid place-items-center bg-slate-200">
        <div className="w-[320px] bg-white min-h-screen">
          <div className="w-full h-14 bg-orange-400 flex items-center justify-start px-4 gap-16 ">
            <div className="w-[40px] h-[70%] rounded-md grid place-items-center border-2 border-black cursor-pointer">
              <Link to={"/"} >
              <img src={arrow} alt="" />
              </Link>
            </div>
            <h2 className="text-2xl font-semibold">
              {filter=="pending" && "New Leads"}
              {filter=="fullfill" && "Follow UP"}
              {filter=="enrolled" && "Enrolled"}
              {filter=="cnt" && "Call Not Received"}
              {filter=="notinterested" && "Not Interested"}
              {filter=="exceptions" && "Exceptions"}
              
              </h2>
          </div>

          {/* Display a loading message or loader when data is being fetched */}
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="justify-between px-3 w-full bg-black text-white">
                  <th className="text-start">Student Id</th>
                  <th className="text-start">College Name</th>
                  <th className="text-start">Name</th>
                </tr>
              </thead>
              <tbody>
                {filterStudent.map((task,index) => (
                  <tr 
                    onClick={()=> handelItemClick(index)}
                  key={task._id} className="border-t-2 h-10">
                    <td>{task.studentid}</td>
                    <td>{task.collegeName}</td>
                    <td>{task.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  export default ListShow;
