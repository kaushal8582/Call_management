import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mycontext } from "../component/context/myContext";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../component/URL";
import logo from "../assets/logo.svg"

const Home = () => {
  const [isAdmin,setIsAdmin] = useState(false)
  const navigate = useNavigate();
  const context = useContext(mycontext);
  const { setFilter } = context;

  useEffect(() => {
    const worker = JSON.parse(localStorage.getItem("worker"));
    if ((worker && worker.data) && worker.data.role == "admin") {
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
  }, []);

  const handelLogout = async () => {
    try {
      const worker = JSON.parse(localStorage.getItem("worker"));
      const accessToken = worker?.accessToken;
      const responseLogout = await fetch(
        `${BASE_URL}/collegeBuddy/api/v1/workers/logout`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (responseLogout.ok) {
        localStorage.removeItem("worker");
        toast.success("Logout success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
    navigate("/list");
  };

  return (
    <div className="flex w-full h-screen items-center justify-center gap-4 flex-col relative">
      <div className="flex flex-col gap-4 w-[310px] bg-[#fff] rounded-lg p-2">
        <img   src={logo} alt="" className="w-full h-14" />

        <button
          onClick={() => handleFilterClick("pending")}
          className="w-full bg-orange-400 p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          New Leads
        </button>

        <button
          onClick={() => handleFilterClick("fullfill")}
          className="bg-blue-600 w-full p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          Follow Up
        </button>

        <button
          onClick={() => handleFilterClick("enrolled")}
          className="bg-green-700 w-full p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          Enrolled
        </button>

        <button
          onClick={() => handleFilterClick("cnt")}
          className="bg-blue-700 w-full p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          Call Not Received
        </button>

        <button
          onClick={() => handleFilterClick("notinterested")}
          className="bg-yellow-700 w-full p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          Not Interested
        </button>

        <button
          onClick={() => handleFilterClick("exceptions")}
          className="bg-green-700 w-full p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          Exceptions
        </button>

      {isAdmin&& <Link to={"/admin"}>
          <button className="bg-emerald-500 w-full p-3 px-11 rounded-lg font-semibold text-[20px]">
            Admin
          </button>
        </Link>}
        

        <button
          onClick={handelLogout}
          className="bg-[#ff0c30] text-white p-3 rounded-md px-11 font-semibold text-[20px]"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Home;
