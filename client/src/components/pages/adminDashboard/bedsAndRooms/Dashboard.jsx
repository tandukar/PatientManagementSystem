import React from "react";
import BedDashboard from "./beds";
import RoomDashboard from "./Rooms";

const BedsRoomsDashboard = () => {
  
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
