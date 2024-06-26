import React from "react";
//spalsh screen
export const Splash = () => {
  return (
    <>
      <div className="flex justify-center m-10 ">
        <h1 className="text-5xl  font-semibold">
          Welcome to the best place for Money Transfer
        </h1>
      </div>
      <p className=" text-center  text-xl text-gray-700 mt-5">
        We have the best Services for you.{" "}
        <a
          href="/login"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Click here to Join Us
        </a>
      </p>
    </>
  );
};
