import React, { useEffect, useState } from "react";

export const SearchComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3200/api/v1/account/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("account Details:", data);
        setUsers(data.account_details);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-2xl">
            {user.user.username[0]}
          </div>
        </div>
        <div className="flex flex-col text-2xl justify-center h-ful">
          <div>
            {user.user.first_name} {user.user.last_name}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center text-xl h-ful mx-5 mt-2">
        <button className=" border border-slate-800 rounded-lg py-2 px-3  ">
          Send Money
        </button>
      </div>
    </div>
  );
}
