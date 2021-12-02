// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';

function App() {
  const [ userData, setUserData ] = useState({});

  const handleChange = e => {
    setUserData({...userData,[e.target.name] : e.target.value});
    // console.log(userData);
  };

  const handleSignup = async e => {
    e.preventDefault();
    console.log(userData);
    const response = await axios.post("http://localhost:4000/auth/signup", {data : userData });
    // console.alert("Signed up")
    console.log(response.data.newUser);
  }

  const handleLogin = async e => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/auth/login", { data : userData });
    if(response.data.token) Cookie.set("jwt", response.data.token);
    console.log("User logged in",response.data.token);
  }

  return (
    <div className="App">

      <div className="card"> 
      <h3> Mern Auth Test </h3>
      <form className="form" action=""  onChange={handleChange}>
        <input className="input" type="text" placeholder="username" name="username"></input>
        <br/>
        <br/>
        <input className="input" type="passowrd" placeholder="passowrd" name="password"></input>
        <br/>
        <br/>
        <button className="buttons" type="submit" onClick={handleSignup}>Signup</button>

        <br/>
        <br/>
        <button className="buttons" type="submit" onClick={handleLogin}>Login</button>
        <div className="messages"> </div>
      </form>
      <div className="disp"> <h3></h3> </div>
      </div>
    </div>
  );
}

export default App;
