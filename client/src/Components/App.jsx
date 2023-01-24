import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Square from './Square';
import UserProfile from './UserProfile';
import TopicPage from './TopicPage';
import '../stylesheets/styles.scss'


const App = () => {

  console.log('hello there')
  console.log(process.env.SESSION_SECRET)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/users/:userId/:squareId" element={<Square />} />
        <Route path="/users/:userId/topics/:topic" element={<TopicPage />} />
      </Routes>
    </Router>
  )
}

export default App;