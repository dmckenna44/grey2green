import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState} from 'react'
import baseUrl from "../apiRoute";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [badSignup, setBadSignup] = useState(true);
  const [goodSignup, setGoodSignup] = useState(true);

  const signUp = (e) => {
    e.preventDefault();
    if(username && password) {
      fetch(`${baseUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          setGoodSignup(false);
          setTimeout(() => navigate('/'), 1500);
        }).catch(err => {
          setBadSignup(false)
          console.log(err);
        })
    } else alert('Username and password are required')
  }

  return (
    <div id="signup-container">
      <h1 className="home-page-title">Grey2Green</h1>
      <h2>Create a New Account</h2>
      <form id="signup-form">
        <label>Username</label>
        <input type="text" required placeholder="Username" onInput={(e) => setUsername(e.target.value)}/>
        <label>Password</label>
        <input type="password" required placeholder="Password" onInput={(e) => setPassword(e.target.value)}/>
        <button type="submit" onClick={signUp}>Sign Up</button>
      </form>
      <div id="signup-modal" hidden={goodSignup} style={{display: goodSignup ? 'none' : 'flex'}}>
        Signed Up! Redirecting to Login Page
        <div className="loader"></div>
      </div>
      <h3 id="badlogin-msg" hidden={badSignup}>That username already exists! <br></br> Try another one.</h3>
    </div>
  )
}

export default SignUp;