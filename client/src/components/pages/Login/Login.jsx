import React from "react";

const Login = () => {
  const [password, setPassword] = React.useState([]);
  const [email, setEmail] = React.useState([]);

  const printHandler = (event) => {
    console.log(email, password);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/4 ">
          <img
            className=" h-screen w-full bg-cover bg-center"
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          />
        </div>
        <div className="w-3/4  bg-slate-100">
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4">
              <div className="text-center font-bold text-3xl text-gray-700 ">
                Welcome Back
              </div>
              <div className=" md:container md:mx-auto ">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Email
                </label>
                <input
                  type="Email"
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="  md:container md:mx-auto ">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Password
                </label>
                <input
                  type="Text"
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="  text-center">
                <button
                  className="w-full  text-white bg-custom-blue hover:bg-blue-700  font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
                  onClick={printHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
