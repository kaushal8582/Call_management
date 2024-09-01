import React from "react";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast"


const TopSection = ({setState}) => {

  

  const allocatedStudent = async()=>{
    try {
      
    } catch (error) {
      console.log(error);
      toast.error("Student not allocated")
      
    }
  }



  return (
    <div className="bg-white p-3 min-h-24 flex gap-6 items-center justify-center ">
      
        <button onClick={()=> setState("studentList")} className="bg-[#3edcff] p-3 px-11 rounded-lg font-semibold text-[20px]">
          Show Student Data
        </button>

        <button onClick={()=>setState("addworker")} className="bg-[#3edcff] p-3 px-11 rounded-lg font-semibold text-[20px]">
          Add worker
        </button>
        <button onClick={()=>setState("import")} className="bg-[#3edcff] p-3 px-11 rounded-lg font-semibold text-[20px]">
          Import Data
        </button>
        <button onClick={()=>setState("allocate")} className="bg-[#3edcff] p-3 px-11 rounded-lg font-semibold text-[20px]">
          Allocated Student
        </button>
        <button onClick={()=>setState("allworker")} className="bg-[#3edcff] p-3 px-11 rounded-lg font-semibold text-[20px]">
          All worker
        </button>
      
    </div>
  );
};

export default TopSection;
