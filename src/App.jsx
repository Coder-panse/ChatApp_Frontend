import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import SelectUserContext from "./Context/SelectUserContext";
import UserContext, { userInfo } from "./Context/UserContext";
import SocketProvider from "./Context/SocketContext";
import { useNavigate } from "react-router-dom";
import ChatcontextProvider from "./Context/Chatcontext";
import ProtectedRoute from "./ProtrectedRoute/ProtectedRoute";
import Profile from "./pages/Profile";

const App = () => {


  return (
    <BrowserRouter>
      <UserContext>
        <SelectUserContext>
          <SocketProvider>
            <ChatcontextProvider>
              <Routes>
                <Route path="/" element={<ProtectedRoute element={<Chat/>}/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile/>}/>
              </Routes>
            </ChatcontextProvider>
          </SocketProvider>
        </SelectUserContext>
      </UserContext>
    </BrowserRouter>
  );
};

export default App;
