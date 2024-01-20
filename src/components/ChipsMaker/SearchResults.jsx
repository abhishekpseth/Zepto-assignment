import React, { useEffect } from "react";

const SearchResults = ({
  data: users,
  setBucket,
  filteredData,
  setFilteredData,
  isLoading,
}) => {
  useEffect(() => {
    users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  const addToBucket = (id, user) => {
    setFilteredData((prev) => prev.filter((user) => user.id !== id)); // added for instant reflection in search result
    setBucket((prev) => [...prev, user]);
  };

  return (
    <div className="absolute top-full border bg-white z-10 h-[200px] overflow-y-scroll w-[400px] flex flex-col">
      {isLoading ? (
        <div className="h-full  grid place-content-center text-gray-400 text-[24px]">
          Loading...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="h-full grid place-content-center text-gray-400 text-[24px]">
          No users found.
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="cursor-pointer flex hover:bg-gray-300"
            onClick={() => addToBucket(user.id, user)}
          >
            <div className="flex gap-3">
              <div>
                <img
                  src={user.image}
                  alt="Profile Picture"
                  className="w-[40px] h-[40px] bg-red-500 rounded-full"
                />
              </div>
              <div className="flex gap-2">
                <div className="w-[140px]">{user.name}</div>
                <div className="text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
