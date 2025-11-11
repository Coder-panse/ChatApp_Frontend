import React, { useContext, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Globe,
  Camera,
  Check,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userInfo } from "@/Context/UserContext";

const Login = () => {
  const { userDetail, setUserDetail } = useContext(userInfo);
  const [user, setUser] = useState({ email: "", password: "" });
  const setLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/user/login",
        user,
        { withCredentials: true }
      );

      setUserDetail(response.data.user);
      // console.log(response.data)
      localStorage.setItem("userEmail", response.data.user.email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-neutral-950 h-screen w-full flex justify-center items-center">
      <div className="h-[500px] w-[400px] bg-neutral-900 text-white rounded-2xl shadow-2xl md:h-[450px] md:w-[400px]">
        <div className="text-center px-5 py-10">
          <h1 className="text-2xl md:text-4xl font-bold">Welcome To GupSuph</h1>
          <p className="text-xs md:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="mx-8">
          <form action="">
            <div className="space-y-2">
              <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={setLogin}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
              />
            </div>

            <div className="space-y-2 mt-6">
              <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 mr-2" />
                Password
              </label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={setLogin}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
              />
            </div>

            <div className="flex justify-center items-center mt-8">
              <button
                className="w-full px-5 py-3 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div className="text-center mt-5">
              <p>
                Don't Have an Account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
