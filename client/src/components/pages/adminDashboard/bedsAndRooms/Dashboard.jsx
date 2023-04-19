import React from "react";

// import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import Box from "@mui/material/Box";

import BedDashboard from "./beds";
import RoomDashboard from "./Rooms";

const BedsRoomsDashboard = () => {
  const [searchTerm, setsearchTerm] = React.useState([]);

  const printHandler = (event) => {
    console.log(searchTerm);
  };

  const registerHandler = (event) => {
    const data = new FormData(event.currentTarget);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row  w-full p-4  gap-5">
        <div className="md:w-1/2  ">
          <BedDashboard />
        </div>

        <div className="md:w-1/2">
          <RoomDashboard />
        </div>
      </div>
    </>
  );
};
export default BedsRoomsDashboard;
