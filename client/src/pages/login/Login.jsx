import {  useContext, useRef } from "react";
import "./login.css";


import { loginCall } from "../../apiCall";
import { AuthContext } from "../../components/context/AuthContext";

import { CircularProgress } from "@mui/material";






export default function Login() {
  const email = useRef();
  const password = useRef();

  const {user, isFetching, dispatch} = useContext(AuthContext);
  

  const handleClick = (e) => {
    e.preventDefault();
      loginCall({email: email.current.value ,password: password.current.value}, dispatch);
  };

  console.log(user);

  

  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Websocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Websocial.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input placeholder="Email" type="email" required className="loginInput" ref={email} />
            <input placeholder="Password" type="password" required minLength="6"  className="loginInput" ref={password} />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching? <CircularProgress color="secondary" size="30px"  />:"Log in"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching? <CircularProgress color="secondary" size="30px"  />:"Create an account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
