import React from "react";
import HoursSelector from "./components/HoursSelector/HoursSelector";
import Watch from "./components/Watch";

const App = () => {
  return (
    <div
      className="w-100 mt-5 d-flex justify-content-center align-items-center"
      style={{
        height: 700,
      }}
    >
      <HoursSelector threshold={4} />
      <Watch />
    </div>
  );
};

export default App;
