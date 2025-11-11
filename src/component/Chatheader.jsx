import { Chatcontext } from "@/Context/Chatcontext";
import { selectedUser } from "@/Context/SelectUserContext";
import React, { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";

const Chatheader = () => {
  let { selectedUserData, setselectedUserData } = useContext(selectedUser);
  const { messages, setMessages, senderTyping } = useContext(Chatcontext);

  const close = () => {
    setselectedUserData(undefined);
    setMessages([]);
  };
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between md:px-20 px-5">
      <div className="flex gap-4">
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={`http://localhost:3000/images/${selectedUserData.image}`}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div>{selectedUserData.username}</div>
          {senderTyping == true ? (
            <p className="text-white font-medium">typing...</p>
          ) : (
            <p>{""}</p>
          )}
        </div>
      </div>
      <div>
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={close}
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Chatheader;
