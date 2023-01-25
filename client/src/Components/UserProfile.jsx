import React, { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCardModal from "./AddCardModal";
import SessionExpModal from "./SessionExpModal";
import baseUrl from "../apiRoute";

import Square from "./Square";

const UserProfile = (props) => {
  const navigate = useNavigate();

  const {userId} = useParams();
  const [userCards, setUserCards] = useState([]);
  const [modalHidden, toggleModal] = useState(true);

  // Retrieve all of the users topic cards from the DB and save them as userCards
  useEffect(() => {
    fetch(`${baseUrl}/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log('cards', data)
        setUserCards(data)
      })
  }, [])

  const logOut = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/api/logout`)
      .then(data => {
        console.log('logged out')
        navigate('/');
      })
  }

  const handleModal = (e) => {
    e.preventDefault();
    console.log('handleModal called')
    toggleModal(!modalHidden);
  }



  // Create list of Square components to render in grid
  const cardList = userCards.map((card, i) => {
    return <Square key={i} details={card} />
  })

  return (
    <div className="user-profile-container">
      <div id="overlay" hidden={modalHidden}></div>
      <a href="/" className="logout-btn" onClick={logOut}>Logout</a>
      <h1>Hello {userId}, </h1>
      <div className="squares">
        <div className="square-container">
          {cardList}
          <div className="square-display add-square" onClick={handleModal}>
            <h1>+</h1>
          </div>
        </div>
      </div>
        <AddCardModal hidden={modalHidden} handleModal={handleModal}/>
    </div>
  )
}

export default UserProfile;