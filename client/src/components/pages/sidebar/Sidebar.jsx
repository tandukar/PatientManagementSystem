import React from "react";
// import RiHomeLine from "react-icons/ri";
import { RiHomeLine } from "react-icons/ri";
import { MdPeopleOutline } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => {
  return (
    <>
      <div className="flex">
        {/* flex: This class makes the <div> a flex container.
-flex-col: This class makes the <div> a vertical flex container, where the child elements are arranged in a column.
-h-screen: This class sets the height of the <div> to the full height of the screen.
-p-3: This class adds 3 units of padding to the <div>.
-bg-white: This class sets the background color of the <div> to white.
-shadow: This class adds a drop shadow to the <div>.
-w-60: This class sets the width of the <div> to 60% of its parent container. */}

        <div className="flex flex-col h-screen p-5 bg-blue-700 w-60">
          <div className="space-y-3">
            {/*this adds margi between elements within a container */}
            <div className="flex items-center">
              <h2 className="text-2xl text-white font-bold "> Remedial</h2>
            </div>
            <div className="flex items-center">
              <nav>
                <ul className="list-none text-lg mt-9">
                  <li className="py-2 ">
                    <a
                      className=" flex items-center text-gray-300 hover:text-white"
                      href="#"
                    >
                      <span className="inline-block  pr-3">
                        <RiHomeLine className="w-7 h-7" />
                      </span>
                      Doctors
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      className=" flex items-center text-gray-300 hover:text-white"
                      href="#"
                    >
                      <span className="inline-block  pr-3">
                        <MdPeopleOutline className="w-7 h-7" />
                      </span>
                      Recetpionist
                    </a>
                  </li>
                  <li className="py-2 ">
                    <a
                      className="flex items-center text-gray-300 hover:text-white"
                      href="#"
                    >
                      <span className="inline-block  pr-3">
                        <MdPeopleOutline className="w-7 h-7" />
                      </span>
                      Rooms/Beds
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="mt-auto">
            <a
              className="flex items-center text-gray-300 hover:text-white"
              href="#"
            >
              <span className="inline-block  pr-3">
                <IoIosSettings className="w-7 h-7" />
              </span>
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
