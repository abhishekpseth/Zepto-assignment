import React from "react";
import ChipsMaker from "./components/ChipsMaker/ChipsMaker";

const App = () => {
  return (
    <>
      <div className="h-[60vh]">
        <ChipsMaker />
      </div>
      <footer className="h-[20vh] grid place-content-center text-center">
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
