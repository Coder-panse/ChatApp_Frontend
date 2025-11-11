import React, { useContext, useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import selectUserContext, { selectedUser } from "@/Context/SelectUserContext";
import axios from "axios";
import { Chatcontext } from "@/Context/Chatcontext";
import { SocketContext } from "@/Context/SocketContext";
import { userInfo } from "@/Context/UserContext";

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const { userDetail,userLanguage } = useContext(userInfo);
  const { selectedUserData } = useContext(selectedUser);

  const { sendMessage, messages, setMessages } = useContext(Chatcontext);
  const { isConnected } = useContext(SocketContext);

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (!isConnected) {
      console.log("Please wait... connecting to server");
      return;
    }
    // setMessages((prev)=>[...prev,message])
    sendMessage({ 
      content:message, 
      sender:userDetail._id,
      recepient:selectedUserData._id, 
      messageType: "text",
      fileUrl:undefined,
    });
    setMessage("");
  };

  const handleTyping=()=>{
    userTyping({
      sender:userDetail._id,
      recepient:selectedUserData._id
    })
  }
  return (

   <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-3 md:px-8 mb-6 gap-3 md:gap-6">
  {/* Input + Buttons */}
  <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-1 md:gap-5 pr-3 md:pr-5">
    <input
      type="text"
      placeholder="Enter Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleTyping}
      className="flex-1 px-2 py-3 md:p-4 bg-transparent rounded-md focus:border-none focus:outline-none text-sm md:text-base"
    />
    <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
      <GrAttachment className="text-lg md:text-2xl" />
    </button>
    <div className="relative">
      <button
        onClick={() => setEmojiPicker(true)}
        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
      >
        <RiEmojiStickerLine className="text-lg md:text-2xl" />
      </button>
      <div className="absolute bottom-14 right-0" ref={emojiRef}>
        <EmojiPicker
          theme="dark"
          open={emojiPicker}
          onEmojiClick={handleAddEmoji}
          autoFocusSearch={false}
        />
      </div>
    </div>
  </div>

  {/* Send Button */}
  <button
    onClick={handleSendMessage}
    className="bg-[#8417ff] rounded-md flex items-center justify-center px-3 py-3 md:p-4 focus:border-none hover:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all cursor-pointer"
  >
    <IoSend className="text-xl md:text-2xl" />
  </button>
</div>


  );
};

export default MessageBar;
