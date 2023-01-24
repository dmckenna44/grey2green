import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState} from 'react'
import baseUrl from "../apiRoute";

const Home = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [badLogin, setLoginStatus] = useState(true);

  const goToSignUp = (e) => {
    e.preventDefault();
    navigate('/signup')
  }

  const logIn = (e) => {
    e.preventDefault();
    if(username && password) {
      fetch(`${baseUrl}/api/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }).then(res => {
        console.log(res.json())
        return res.json()
      }).then(data => {
        console.log(data)
        if(data) navigate(`users/${data.username}`)
      }).catch(err => {
        setLoginStatus(false);
        // alert('Couldn\'t find a user with that name and password')
      })
    }
  }

  const updateUsername = (e, text) => {
    setUsername(e.target.value);
    setLoginStatus(true);
  }

  const updatePassword = (e, text) => {
    setPassword(e.target.value);
    setLoginStatus(true);
  }

  return (
    <div id="home-page-container">
      <h1 className="home-page-title">Grey2Green</h1>
      <h3>Get Yourself Interview-Ready!</h3>
      <form id="login-form">
        <label>Username</label>
        <input type="text" required placeholder="Username" onInput={updateUsername}/>
        <label>Password</label>
        <input type="password" required placeholder="Password" onInput={updatePassword}/>
        <button onClick={logIn}>Sign In</button>
      </form>
      <h3 id="badlogin-msg" hidden={badLogin}>Couldn't find a user with that name and password. Try again.</h3>
      <h4>Don't have an account? Sign up <a href="" onClick={goToSignUp}>here</a> </h4>
    </div>

  )
}

export default Home;