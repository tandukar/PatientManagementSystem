import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white font-sans">
      <nav className="bg-transparent z-10 absolute w-full">
        <div className="ml-24 m-3 flex items-center justify-start h-16">
          <span className="  text-white text-4xl font-bold text-left ml-4">
            ReMedial
          </span>
        </div>
      </nav>
      <div className="relative">
        <img
          className="w-full object-cover h-screen "
          src="https://absolutecorporatesolutions.com/images/hospital-management-system-in-kenya.jpg"
          // src="https://ledenews.com/wp-content/uploads/2021/06/healthcare-system-1536x864.jpg"
          alt="hero"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-5">Patient Management System</h1>
          <h2 className="text-2xl mb-8">
            A simple way to manage your patients
          </h2>
          <Link to="/login">
            <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded hover:bg-gray-200 hover:text-gray-900 transition duration-200 ease-in-out">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="border-2 border-gray-200 p-4 rounded-lg hover:border-gray-300 transition duration-200 ease-in-out">
              <h3 className="text-xl font-bold mb-3">Appointment Scheduling</h3>
              <p className="text-gray-700">
                Schedule appointments with ease and keep track of your patient's
                visit history.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="border-2 border-gray-200 p-4 rounded-lg hover:border-gray-300 transition duration-200 ease-in-out">
              <h3 className="text-xl font-bold mb-3">Patient Records</h3>
              <p className="text-gray-700">
                Keep all patient information organized and accessible, including
                medical history, medications, and allergies.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="border-2 border-gray-200 p-4 rounded-lg hover:border-gray-300 transition duration-200 ease-in-out">
              <h3 className="text-xl font-bold mb-3">Billing and Insurance</h3>
              <p className="text-gray-700">
                Streamline billing and insurance claims with our easy-to-use
                system, including support for multiple insurance providers.
              </p>
            </div>
          </div>
        </div>

        <div class="h-screen flex flex-row p-5">
          <div class="flex w-1/2 bg-blue-600 p-5 text-white">
            <div className="w-full mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Hospital Registration</h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Hospital Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter hospital name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>

                <button className="px-6 py-3 bg-purple-500 text-white font-bold rounded hover:bg-purple-700 transition duration-200 ease-in-out">
                  Sign Up Now
                </button>
              </form>
            </div>
          </div>

          <div class="flex w-1/2 bg-gray-200  justify-center items-center p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-64 w-64 text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 0a9.982 9.982 0 0 0-7.071 2.929 10.015 10.015 0 0 0 0 14.142 10.015 10.015 0 0 0 14.142 0 10.015 10.015 0 0 0 0-14.142A9.982 9.982 0 0 0 10 0zm-1.414 14.142a7.978 7.978 0 0 1-3.535-3.536l7.071-7.07a7.978 7.978 0 0 1 3.535 3.535l-7.071 7.071z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
