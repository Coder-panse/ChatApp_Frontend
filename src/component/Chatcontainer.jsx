import React from 'react'
import Chatheader from './Chatheader'
import MessageBar from './MessageBar'
import Messagecontainer from './Messagecontainer'

const Chatcontainer = () => {
  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1 '>
        <Chatheader/>
        <Messagecontainer/>
        <MessageBar/>

    </div>
  )
}

export default Chatcontainer