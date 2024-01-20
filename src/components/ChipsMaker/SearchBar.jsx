import React from "react";
import { useState, useEffect, useRef } from "react";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [bucket, setBucket] = useState([]);
  const [usersListOpen, setUsersListOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isInputEmpty, setInputEmpty] = useState(true);
  const lastBucketItemRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/users");
        const json = await response.json();
        setLoading(false);
        json.users.forEach((user) => {
          user.name = `${user.firstName} ${user.lastName}`;
        });
        setUserData(json.users);
        setFilteredData(json.users); // to show all data by default
      } catch (error) {
        console.log("Unable to fetch data");
      }
    };
    fetchUserData();
  }, []);

  const searchUsers = (event) => {
    const searchValue = event.target.value;
    setQuery(searchValue);
    setInputEmpty(searchValue === "");
    const filteredResults = userData?.filter(
      (user) =>
        !bucket.some((bucketUser) => bucketUser.id === user.id) &&
        user.name.toLowerCase().includes(searchValue)
    );
    setUsersListOpen(true);
    setFilteredData(filteredResults);
  };

  const removeFromBucket = (id, user) => {
    setBucket((prev) => prev.filter((user) => user.id !== id)); // added for instant reflection in search result
    setFilteredData((prev) => [...prev, user]);
  };

  let deletePrev = false;
  const handleBackSpace = () => {
    if (isInputEmpty) {
      if (!deletePrev) {
        lastBucketItemRef.current.style.border = "2px solid blue";
        deletePrev = true;
      } else {
        setBucket((prevBucket) => prevBucket.slice(0, -1));
        lastBucketItemRef.current.style.backgroundColor = "rgb(156 163 175)";
        deletePrev = false;
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="text-blue-600 text-[40px] font-bold">Pick Users</h1>
      <div className="flex flex-col gap-2">
        <div className="w-[60vw]  border-b-2 border-black grid grid-cols-[auto_min_content]">
          <div className="w-full flex flex-wrap gap-2">
            {bucket?.map((user, index) => (
              <div
                key={user.id}
                ref={index === bucket.length - 1 ? lastBucketItemRef : null}
                className="flex justify-center items-center gap-2 bg-gray-400 px-2 py-2 rounded-[50px]"
              >
                <div className="h-[20px] w-[20px]">
                  <img src={user.image} alt="Profile Picture" />
                </div>
                <div className="text-[16px] whitespace-nowrap">{user.name}</div>
                <div
                  className="text-black cursor-pointer"
                  onClick={() => removeFromBucket(user.id, user)}
                >
                  &#x2715;
                </div>
              </div>
            ))}
            <div className="relative">
              <input
                type="text"
                placeholder="Add a new user..."
                className="w-full border-none outline-none text-[24px]"
                value={query}
                onFocus={searchUsers}
                onChange={searchUsers}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") handleBackSpace();
                }}
              />
              {usersListOpen && (
                <SearchResults
                  data={filteredData}
                  setBucket={setBucket}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
