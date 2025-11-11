import React, { useContext, useEffect } from "react";
import Chatcontainer from "../component/Chatcontainer";
import ContactContainer from "../component/ContactContainer";
import Emptycontainer from "../component/Emptycontainer";
import { selectedUser } from "@/Context/SelectUserContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { selectedUserData } = useContext(selectedUser);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {selectedUserData == undefined ? <Emptycontainer /> : <Chatcontainer />}
      {/* <Emptycontainer/> */}
      {/* <Chatcontainer/> */}
    </div>
  );
};

export default Chat;
