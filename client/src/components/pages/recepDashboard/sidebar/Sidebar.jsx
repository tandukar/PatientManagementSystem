import React from "react";
// import RiHomeLine from "react-icons/ri";
import { RiHomeLine } from "react-icons/ri";
import { MdPeopleOutline } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ sidebarOpen, setSidebarOpen, onItemClick }) => {
  const [visibleIcon, setvisibleIcon] = React.useState(false);

  const logoutHandler =()=>{
    localStorage.removeItem("token"); 
    sessionStorage.removeItem("role"); 
    window.location.href = "/login";
  }

  return (
    <>
      <div className="flex">
        <div
          className="flex flex-col h-screen p-5 bg-custom-blue w-60 "
          onMouseEnter={() => setvisibleIcon(true)}
          onMouseLeave={() => setvisibleIcon(false)}
        >
          <div className="space-y-3">
            <div className="flex flex-row ">
              <div className="flex w-2/3 items-center">
                <h2 className="text-2xl text-white font-bold "> ReMedial</h2>
              </div>

              <div className="flex w-1/3 items-center justify-end ">
                <RxCross2
                  onClick={() => setSidebarOpen(false)}
                  className={`${
                    visibleIcon ? "opacity-1" : "opacity-0"
                  } hover:opacity-1  text-white  h-6 w-6  transform transition-all duration-300 ease-in-out`}
                />
              </div>
            </div>
            <div className="flex items-center ">
              <nav>
                <ul className="list-none text-lg mt-9">
                  <li className="py-2 ">
                    <a
                      className=" flex items-center text-white md:text-gray-300 hover:text-white"
                      href="#"
                      onClick={() => onItemClick("Patients")}
                    >
                      <span className="inline-block  pr-3">
                        <RiHomeLine className="w-7 h-7" />
                      </span>
                      Patients
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      className=" flex items-center text-white md:text-gray-300 hover:text-white"
                      href="#"
                      onClick={() => onItemClick("Appointments")}
                    >
                      <span className="inline-block  pr-3">
                        <MdPeopleOutline className="w-7 h-7" />
                      </span>
                      Appointments
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      className=" flex items-center text-white md:text-gray-300 hover:text-white"
                      href="#"
                      onClick={() => onItemClick("Doctors")}
                    >
                      <span className="inline-block  pr-3">
                        <MdPeopleOutline className="w-7 h-7" />
                      </span>
                      Doctors
                    </a>
                  </li>
                 
                </ul>
              </nav>
            </div>
          </div>
          <div className="mt-auto">
            <a
              className=" flex items-center text-white md:text-gray-300 hover:text-white"
              onClick={logoutHandler}
            >
              <span className="inline-block  pr-3">
                <IoIosSettings className="w-7 h-7" />
              </span>
              Logout
            </a>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
export default Sidebar;