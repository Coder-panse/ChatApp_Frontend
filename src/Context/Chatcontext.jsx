import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContext } from "./SocketContext";
import UserContext, { userInfo } from "./UserContext";
import { selectedUser } from "./SelectUserContext";
import axios from "axios";

export const Chatcontext = createContext();

const ChatcontextProvider = ({ children }) => {
  const { socket, isConnected } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [newMessages, setnewMessages] = useState("");
  const [senderTyping, setSenderTyping] = useState(false);
  const { userDetail } = useContext(userInfo);
  const { selectedUserData } = useContext(selectedUser);

  const selectedRef = useRef(selectedUserData);

  useEffect(() => {
    selectedRef.current = selectedUserData;
    if (selectedRef.current) {
      getMessage();
    }
  }, [selectedUserData]);

  useEffect(() => {
    if (!isConnected || !socket?.current) {
      console.log("socket not connected");
      return;
    }

    const receiveTyping = (data) => {
      console.log(data);
      if (
        selectedRef.current &&
        data.sender?.toString() == selectedRef.current._id?.toString() &&
        data.recepient?.toString() == userDetail._id?.toString()
      ) {
        setSenderTyping(true);
      }

      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(() => {
        setSenderTyping(false);
      }, 2000);
    };

    socket.current.on("receiveTyping", receiveTyping);

    return () => {
      socket.current.off("receiveTyping", receiveTyping);
    };
  }, [socket, isConnected]);

  useEffect(() => {
    if (!isConnected || !socket?.current) return;

    const handleReceive = (message) => {
      console.log(message);
      if (
        selectedRef.current &&
        ((message.sender?.toString() === selectedRef.current._id?.toString() &&
          message.recepient?.toString() === userDetail._id?.toString()) ||
          (message.recepient?.toString() ===
            selectedRef.current._id?.toString() &&
            message.sender?.toString() === userDetail._id?.toString()))
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.current.on("receiveMessage", handleReceive);

    return () => {
      socket.current.off("receiveMessage", handleReceive);
    };
  }, [isConnected, socket]);

  const getMessage = async () => {
    try {
      console.log(selectedRef.current._id);
      const response = await axios.get(
        `http://localhost:3000/api/getmessage/${selectedRef.current._id}`,
        { withCredentials: true }
      );
      console.log(response.data.formattedMessage);
      setMessages(response.data.formattedMessage);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async (message) => {
    try {
      if (!isConnected || !socket?.current) {
        console.warn("Socket not connected yet!");
        return;
      }
      setMessages((prev) => [...prev, message]);
      socket.current.emit("sendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  const userTyping = (data) => {
    socket.current.emit("typing", data);
  };

  return (
    <Chatcontext.Provider
      value={{
        messages,
        setMessages,
        newMessages,
        setnewMessages,
        sendMessage,
        senderTyping,
        setSenderTyping,
        userTyping,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};

export default ChatcontextProvider;
