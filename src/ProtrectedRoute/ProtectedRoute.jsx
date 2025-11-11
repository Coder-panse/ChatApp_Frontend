import { userInfo } from '@/Context/UserContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({element}) => {

    const {userDetail}=useContext(userInfo)
    return userDetail? element : <Navigate to='/login'/>
}

export default ProtectedRoute