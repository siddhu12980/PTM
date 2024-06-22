import React, { useEffect, useState } from "react";
import { SearchComponent } from "../components/SearchComponent";

export const Daashboard = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3200/api/v1/account/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setName(data.user);
        setBalance(data.account.balance);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="h-16 bg-slate-300 flex justify-between items-center p-3 md:p-5">
        <div className="flex flex-col justify-center text-black text-center">
          <h1 className="text-2xl md:text-4xl">Patym App</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xl md:text-4xl">Hello</div>
          <div className="rounded-full h-10 w-10 md:h-14 md:w-14 bg-slate-200 flex justify-center items-center">
            <div className="text-lg md:text-xl">{name}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center mt-5">
          <div className="bg-slate-300 px-3 py-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="text-2xl px-5">Balance</div>
              <div className="text-2xl font-bold">₹{balance}</div>
            </div>
          </div>
        </div>
      </div>
      <SearchComponent />
    </>
  );
};
