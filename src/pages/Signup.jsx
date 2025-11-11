import React, { use, useContext } from "react";
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

const Signup = () => {

  const { userDetail, setUserDetail } = useContext(userInfo);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    language: undefined,
  });
  const [image, setImage] = useState("")
  const navigate = useNavigate();


  const handleFilechange=(e)=>{
      setImage(e.target.files[0])
  }
  const handleSignup = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData=new FormData();
      formData.append("username",user.username)
      formData.append("email",user.email)
      formData.append("password",user.password)
      formData.append("image",image)

      // console.log([...formData.entries()])
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData,
        { withCredentials: true }
      );
      setUserDetail(response.data.user);
      // console.log(response.data)
      localStorage.setItem("userEmail", response.data.user.email);
      navigate("/");
      setUser({username:"",email:"",password:""})
      setImage({image:""})
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-neutral-950 h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-[500px] bg-neutral-900 text-white rounded-2xl shadow-2xl p-3 md:p-8 mx-auto">
        <div className="text-center px-5 py-10 ">
          <h1 className="text-2xl md:text-4xl font-bold ">Welcome To GupSuph</h1>
          <p className=" text-xs md:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="mx-8">
          <form action="" encType="multipart/form-data">
            <div className="space-y-2">
              <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <User className="w-3.5 h-3.5 mr-2" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleSignup}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
              />
            </div>

            <div className="space-y-2 mt-6">
              <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 mr-2" />
                Mail
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleSignup}
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
                onChange={handleSignup}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
              />
            </div>

            <div className="space-y-2 mt-6">
              <label className="flex items-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 mr-2" />
                Profile Pic
              </label>

              <input
                type="file"
                name="image"
                // value={user.image}
                onChange={handleFilechange}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all"
              />
            </div>


            <div className="flex justify-center items-center mt-8">
              <button
               className="w-full px-5 py-3 bg-white text-neutral-900 rounded-xl font-medium hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>

            <div className="text-center mt-5">
              <p>
                Already Have an Account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
