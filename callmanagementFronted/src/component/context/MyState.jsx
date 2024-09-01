import { useEffect, useState } from "react";
import { mycontext } from "./myContext";

const MyState = (prop) => {
  const [isLogin, setIsLogin] = useState(false);
  const [workerDetails, setWorkerDetails] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loader, setLoader] = useState(false);
  const [myStudents, setMyStudents] = useState();
  const [myPendingStudent, setMyPendingStudent] = useState();
  const [myFullFillStudent, setMyFullFillStudent] = useState();
  const [followUp, setMyFollowUp] = useState();
  const [filter,setFilter] = useState("fullfill")
  const [index,setIndex] = useState(null)
  const [filterStudent,setFilterStudents] = useState([])

  
  return (
    <mycontext.Provider
      value={{
        isLogin,
        setIsLogin,
        setWorkerDetails,
        workerDetails,
        isAdmin,
        setIsAdmin,
        setLoader,
        setMyStudents,
        myPendingStudent,
        myFullFillStudent,
        myStudents,
        filter,setFilter,
        index,setIndex,
        filterStudent,
        setFilterStudents
      }}
    >
      {prop.children}
    </mycontext.Provider>
  );
};

export { MyState };
