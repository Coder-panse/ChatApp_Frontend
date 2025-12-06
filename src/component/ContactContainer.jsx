import React, { useContext } from "react";
import NewDm from "./NewDm";
import { userInfo } from "@/Context/UserContext";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { selectedUser } from "@/Context/SelectUserContext";

const ContactContainer = () => {
  const { userDetail, setUserDetail } = useContext(userInfo);
  const {setselectedUserData} = useContext(selectedUser)
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get("https://chatapp-backend-1-p3lu.onrender.com/user/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      setUserDetail(undefined);
      setselectedUserData(undefined)
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vww] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="p-5 text-purple-500 text-2xl md:text-4xl" >Gupshup</div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>

      <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33] cursor-pointer">

        <div className="flex gap-4">

          <div className="h-8 w-8 rounded-full overflow-hidden">
          <img className="h-full w-full object-cover" src={`https://chatapp-backend-1-p3lu.onrender.com/images/${userDetail.image}`} alt="" />
        </div>
        <div 
        className="flex gap-3 items-center justify-between "
        onClick={()=>navigate("/profile")}
        >
          {userDetail.username}
        </div>
        </div>
        <div>
          <button>
            <MdLogout size={20} onClick={logout} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
