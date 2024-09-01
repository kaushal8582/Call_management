import React, { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../component/URL";
import { useContext } from "react";
import { mycontext } from "../component/context/myContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(mycontext);
  const { setIsLogin,setMyStudents } = context;
  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");


  const handelLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(email,passwrod);
      
      if (email == "" || passwrod == "") {
        return toast.error("All Fields are required");
      }

      console.log(email, passwrod);

      const response = await fetch(
        `${BASE_URL}/collegeBuddy/api/v1/workers/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: passwrod,
          }),
        }
      );

      const data = await response.json();

      const value = {
        data: data.data.worker,
        accessToken: data.data.accessToken,
      };

      if (response.ok) {
        localStorage.setItem("worker", JSON.stringify(value));
        setIsLogin(true);
        // getAllUser(data.data.worker._id);
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen grid place-items-center  p-2 rounded-md ">
      <div className="bg-white min-w-[400px] p-3 rounded-md flex items-start justify-start flex-col gap-5">
        <h2 className="w-full text-center text-[30px] font-semibold">Login</h2>
        <div className="w-full">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email..."
            className=" pl-4 h-[40px] w-full outline-none border-2 border-blue-500"
          />
        </div>
        <div className="w-full">
          Password
          <input
            value={passwrod}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password..."
            className=" pl-4  h-[40px] outline-none w-full border-2 border-blue-500"
          />
        </div>
        <button
          onClick={handelLogin}
          className="bg-[#6ef0ff] p-3 px-11 rounded-lg font-semibold text-[20px]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
