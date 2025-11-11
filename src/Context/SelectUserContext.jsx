import React, { Children, createContext, useState } from 'react'

export const selectedUser=createContext()

const SelectUserContext = ({children}) => {

  
  
    const [selectedUserData, setselectedUserData] = useState(undefined)
    const [closeUserData, setcloseUserData] = useState(undefined)
  return (
    <div>
        <selectedUser.Provider value={{selectedUserData,setselectedUserData,closeUserData, setcloseUserData}} >
            {children}
        </selectedUser.Provider>
    </div>
  )
}

export default SelectUserContext