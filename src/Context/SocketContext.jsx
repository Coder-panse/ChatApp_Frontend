import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import { userInfo } from './UserContext';
import { useNavigate } from 'react-router-dom';

export const SocketContext=createContext();

const SocketProvider = ({children}) => {
    const navigate=useNavigate() 

    const {userDetail}=useContext(userInfo)
    const [isConnected,setIsConnected]=useState(false)
    const socket=useRef();
    useEffect(()=>{
      if(!userDetail) {
        navigate("/login")
        return
      }

      socket.current=io("http://localhost:3000",{
        query:{
        userId:userDetail._id
        }
    })

    socket.current.on("connect",()=>{
      console.log("connected ")
      setIsConnected(true)
    })

    socket.current.on("disconnect",()=>{
      setIsConnected(false)
    })
    return ()=> {socket.current.disconnect()}
    },[userDetail])
    
  return (
    <SocketContext.Provider value={{socket,isConnected}}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider