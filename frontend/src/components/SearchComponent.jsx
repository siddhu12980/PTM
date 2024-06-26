import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

export const SearchComponent = ({ my_id }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setIsLoading(true);
    fetch(`http://localhost:3200/api/v1/account/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data.account_details);
        setFilteredUsers(data.account_details); // Initially set filtered users to all users

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  const filterUsers = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim() === "") {
        setFilteredUsers(allUsers); // If search query is empty, show all users
      } else {
        const filtered = allUsers.filter((user) =>
          user.user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }, 500),
    [allUsers]
  );

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    filterUsers(searchQuery);
  };

  return (
    <div className="p-4">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search users..."
          className="w-full px-2 py-1 border  text-2xl rounded border-slate-200 mb-2"
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <MemoizedUser user={user} my_id={my_id} key={user.user_id} />
          ))}
        </div>
      )}
    </div>
  );
};

const User = ({ user, my_id }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
          <div className="text-2xl">{user.user.username[0]}</div>
        </div>
        <div className="text-xl">
          {user.user.first_name} {user.user.last_name}
        </div>
      </div>

      <div className="text-xl">
        {user.user_id === my_id ? (
          <div> </div>
        ) : (
          <button className="border border-slate-800 rounded-lg py-2 px-3">
            <Link
              to={`/send?id=${user.user_id}&name=${user.user.username}`}
              className="text-slate-800 hover:text-slate-500"
            >
              Send Money
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

const MemoizedUser = React.memo(User);
