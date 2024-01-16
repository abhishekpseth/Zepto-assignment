import React from "react";
import { useState, useEffect, useRef } from "react";
import SearchResults from "./SearchResults";

const ChipsMaker = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
        setError("Unable to fetch data");
      }
    };
    fetchUserData();
  }, []);

  const searchUsers = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === "") {
      setInputEmpty(true);
      const filteredResults = userData?.filter(
        (user) => !bucket.some((bucketUser) => bucketUser.id === user.id)
      );
      setFilteredData(filteredResults);
    } else {
      setInputEmpty(false);
      const filteredUsers = userData?.filter((user) =>
        user.name.toLowerCase().includes(searchValue)
      );
      const filteredResults = filteredUsers?.filter(
        (user) => !bucket.some((bucketUser) => bucketUser.id === user.id)
      );
      setFilteredData(filteredResults);
    }
  };

  const removeFromBucket = (id, user) => {
    setBucket((prev) => prev.filter((user) => user.id !== id)); // added for instant reflection in search result
    setFilteredData((prev) => [...prev, user]);
  };

  const highlightLastChip = () => {
    lastBucketItemRef.current.style.backgroundColor = "yellow";
  };

  const removeLastChip = () => {
    if (bucket.length > 0) {
      const updatedBucket = bucket.slice(0, -1);
      setBucket(updatedBucket);
    }
    lastBucketItemRef.current.style.backgroundColor = "rgb(156 163 175)";
  };

  let deletePrev = false;
  const handleBackSpace = () => {
    if (isInputEmpty) {
      if (deletePrev == false) {
        // handle backspace, if deletePrev false means it has to highlight last chip else, it has to remove last chip
        highlightLastChip();
        deletePrev = true;
      } else if (deletePrev == true) {
        removeLastChip();
        deletePrev = false;
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="text-blue-600 text-[40px] font-bold">Pick Users</h1>
      <div className="w-[700px]  border-b-2 border-black grid grid-cols-[min-content_auto]">
        <div className="max-w-[700px] flex gap-2 overflow-x-scroll scroll-m-[100px]">
          {bucket?.map((user, index) => (
            <div
              key={user.id}
              ref={index === bucket.length - 1 ? lastBucketItemRef : null}
              className="flex justify-center items-center gap-2 bg-gray-400 px-2 border rounded-[50px]"
            >
              <div className="h-[12px] w-[12px]">
                <img src={user.image} alt="Profile Picture" />
              </div>
              <div className="text-[12px] whitespace-nowrap">{user.name}</div>
              <div
                className="text-black text-[12px]"
                onClick={() => removeFromBucket(user.id, user)}
              >
                &#x2715;
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Add a new user..."
            className="w-full border-none outline-none text-[24px]"
            onFocus={() => {
              setUsersListOpen(true);
              searchUsers;
            }}
            onChange={searchUsers}
            onKeyDown={(event) => {
              if (event.key === "Backspace") handleBackSpace();
            }}
          />
          {usersListOpen && (
            <SearchResults
              data={filteredData}
              setBucket={setBucket}
              setFilteredData={setFilteredData}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipsMaker;
