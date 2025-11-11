import React from "react";
import Lottie from "react-lottie";

const Emptycontainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center text-center lg:text-4xl text-3xl transition-all duration-300">
        <h3>
            Hi <span className="text-purple-500">! </span>Welcome to
            <span className="text-purple-500"> Gupsuph</span>
            
        </h3>
      </div>
    </div>
  );
};

export default Emptycontainer;
