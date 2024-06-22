import React from "react";
import { CgProfile } from "react-icons/cg";

export const Daashboard = () => {
  return (
    <>
      <div className="h-16 bg-slate-300 flex justify-between items-center p-3 md:p-5">
        <div className="flex flex-col justify-center text-black text-center">
          <h1 className="text-2xl md:text-4xl">Patym App</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xl md:text-4xl">Hello</div>
          <div className="rounded-full h-10 w-10 md:h-14 md:w-14 bg-slate-200 flex justify-center items-center">
            <div className="text-lg md:text-2xl">U</div>
          </div>
        </div>
      </div>
    </>
  );
};
