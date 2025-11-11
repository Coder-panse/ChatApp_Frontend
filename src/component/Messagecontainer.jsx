import React, { useContext, useEffect, useRef } from "react";
import { selectedUser } from "@/Context/SelectUserContext";
import { userInfo } from "@/Context/UserContext";
import { Chatcontext } from "@/Context/Chatcontext";

const Messagecontainer = () => {
  const { messages } = useContext(Chatcontext);
  const {userDetail} = useContext(userInfo)
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {messages.map((msg, i) => {
        const isSentByMe = msg.sender === userDetail._id;
        return (
          <div
            key={i}
            className={`flex flex-col w-full mb-2 ${
              isSentByMe ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-2 rounded-xl max-w-[70%] ${
                isSentByMe
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
                <p>{msg.content}</p>
            </div>
              <p>{msg.time}</p>
          </div>
        );
      })}
      {/* <div ref={scrollRef} /> */}
    </div>
  );
};
export default Messagecontainer;
