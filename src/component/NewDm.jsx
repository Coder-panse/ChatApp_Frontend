import React, { useContext, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectedUser } from "../Context/SelectUserContext";

const NewDm = () => {
  const {selectedUserData,setselectedUserData}=useContext(selectedUser)
  const [openNewContactModal, setopenNewContactModal] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);
  const searchContact = async (search) => {
    try {
      if (search.length > 0) {
        const response = await axios.post(
          "https://chatapp-backend-1-p3lu.onrender.com/contact/search",
          {search},
          { withCredentials: true }
          
          
        );
        if (response.status === 200 && response.data.contacts) {
        setsearchedContacts(response.data.contacts);
        
      }
      }
       else {
        setsearchedContacts([]);
      }
    } catch (error) {
      console.log(error)
    }
    
  };
  const selectNewContact=(contact)=>{
      setopenNewContactModal(false)
      setselectedUserData(contact)
    }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400"
              onClick={() => setopenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent>Add to Contact</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setopenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search For Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={e=>searchContact(e.target.value)}
            />
          </div>
          {
            searchedContacts.length>0 && (
                 <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={()=>selectNewContact(contact)}
                >
                  <div className="flex flex-col">
                    <span>
                      {contact.username?`${contact.username}`:""}
                    </span>
                    <span className="text-xs">
                      {contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
            )
          }
         
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all">
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center text-center lg:text-3xl text-2xl transition-all duration-300">
                <h3>
                  Hi <span className="text-purple-500">! </span>Search new
                  <span className="text-purple-500"> Contacts.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
