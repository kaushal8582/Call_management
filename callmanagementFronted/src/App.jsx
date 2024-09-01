import { MyState } from "./component/context/myState";
import FollowUp from "./pages/FollowUp";
import FullFill from "./pages/FullFill";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pending from "./pages/Pending";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "./component/URL";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { mycontext } from "./component/context/myContext";
import Admin from "./pages/admin/Admin";
import NewCard from "./pages/NewCard";
import Follow from "./pages/Follow";
import ListShow from "./pages/ListShow";
import Card from "./pages/Card";

function App() {
  return (
    <div className="w-full h-[100vh] bg-[#e0e0e0] relative">
      <MyState>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedLogin>
                   <Home />
                 </ProtectedLogin>
              }
            />
            <Route
              path="/list"
              element={
                <ProtectedLogin>
                   <ListShow/>
                 </ProtectedLogin>
              }
            />
            <Route
              path="/pending"
              element={
                <ProtectedLogin>
                  <NewCard/>
                </ProtectedLogin>
              }
            />
            <Route
              path="/fullfill"
              element={
                <ProtectedLogin>
                  <FullFill />
                </ProtectedLogin>
              }
            />
            <Route
              path="/card"
              element={
                <ProtectedLogin>
                  <Card/>
                </ProtectedLogin>
              }
            />
            <Route
              path="/followup"
              element={
                <ProtectedLogin>
                  {/* <FollowUp /> */}
                  <Follow/>
                </ProtectedLogin>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <Admin />
                </ProtectedAdmin>
              }
            />
          </Routes>
        </Router>
        <Toaster />
      </MyState>
    </div>
  );
}

export default App;



export const ProtectedLogin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const worker = JSON.parse(localStorage.getItem("worker"));

    if (!worker || !worker.data || (worker.data.role !== "worker" && worker.data.role!=='admin' )) {
      navigate("/login");
    }
  }, [navigate]);

  // Return null or a fallback UI while navigating
  return <>{children}</>;
};

export const ProtectedAdmin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const worker = JSON.parse(localStorage.getItem("worker"));

    if (!worker || !worker.data || worker.data.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Return null or a fallback UI while navigating
  return <>{children}</>;
};

