import { useState } from "react";
import axios from 'axios';
// import "../index.css";



function Login() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
  }); 

  const { firstname, lastname, age, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      //object ho bhane function ko curly braces ma () halne
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(firstname, lastname, age, email, password);
    axios.post("http://localhost:5000/api/user/login",formData )
    .then(res => console.log(res.data))
  };

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "3rem"
  }


  return (
    <>
      <section className="heading" style={{marginTop:"7rem"}} >
        <h2>Login</h2>
        <p>Login to your Account</p>
      </section>

      <section className="form" style={wrapperStyle}>
        <form onSubmit={onSubmit}>
          
         
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter  password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
