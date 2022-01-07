import "./register.css";
import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";



export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();


  const handleClick = async (e) =>{
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    }
    else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Websocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Websocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username"  required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" required ref={email}  className="loginInput" />
            <input placeholder="Password" minLength="6" type="password" required ref={password}  className="loginInput" />
            <input placeholder="Retype Password " minLength="6" type="password" required ref={passwordAgain}  className="loginInput" />
            <button className="loginButton" type= "submit"> Sign Up</button>
            <div className="prompt">Already have an Account?</div>
            <button className="loginRegisterButton">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}