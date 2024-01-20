import React from "react";
import SearchBar from "./components/ChipsMaker/SearchBar";

const App = () => {
  return (
    <>
      <SearchBar />
      <footer className="mt-[40vh] grid place-content-center text-center">
        <h1 className="font-bold">By Abhishek Prasad Seth</h1>
        <p>Aspiring Frontend Developer</p>
        <p>B.Tech NIT ALLAHABAD 2023</p>
        <p>Email: abhishekpseth@gmail.com</p>
        <a
          href="https://abhishekpseth.github.io/Portfolio/"
          className="text-blue-600 font-bold"
        >
          Check my Portfolio here
        </a>
      </footer>
    </>
  );
};

export default App;
