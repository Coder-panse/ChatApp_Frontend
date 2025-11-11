import React, { Children, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const userInfo=createContext();
const UserContext = ({children}) => {

    const [userDetail, setUserDetail] = useState();
    const [userLanguage,setUserLanguage]=useState(undefined);
    const navigate=useNavigate()

    // useEffect(()=>{
    //   const email=localStorage.getItem("userEmail")
    //   if(email) setUserDetail(email)
    //   console.log(userDetail)
    // },[])
    
  return (
    <div>
        <userInfo.Provider value={{userDetail,setUserDetail,userLanguage,setUserLanguage}}>
            {children}
        </userInfo.Provider>
    </div>
  )
}

export default UserContext