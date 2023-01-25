import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AddCardModal from "./AddCardModal";
import DeleteCardModal from "./DeleteCardModal";
import baseUrl from "../apiRoute";


const TopicPage = (props) => {

  const navigate = useNavigate();
  const {userId} = useParams();
  console.log('params', useParams())

  const location = useLocation();
  const {answer, question, topic, _id} = location.state.details;

  const [showAnswer, setShowAnswer] = useState(false);
  const [modalHidden, toggleModal] = useState(true);
  const [deleteHidden, toggleDelete] = useState(true);
  const [showGreen, setShowGreen] = useState(false);
  const [showOrange, setShowOrange] = useState(false);
  const [showGrey, setShowGrey] = useState(false);

  let buttonDisplay = showAnswer ? 'Show Question' : 'Show Answer'

  const flipCard = (e) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
    console.log(showAnswer)
  }

  const setPrepLevel = (e, func, color) => {
    e.preventDefault();
    func(true);
    fetch(`${baseUrl}/api/updateCardPrep`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: _id,
        color: color
      })
    }).then(res => res.json())
      .then(data => {
        func(false);
      })
  }

  const handleModal = (e) => {
    e.preventDefault();
    toggleModal(!modalHidden);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    toggleDelete(!deleteHidden);
  }

  const returnToProf = (e) => {
    e.preventDefault();
    navigate(`/users/${userId}`)
  }
  
  return (
    <div className="topic-page-container">
      <p className="back-to-prof-link" onClick={returnToProf} >← Back to Profile</p>
      <h2>{topic}</h2>
      <div className={`card-container ${showAnswer ? 'flipCard' : ''}`}>
        { 
          !showAnswer ? 
          <div className={`topic-card-front`}>
            <h3><em>Question/Prompt</em></h3>  
            {question}
          </div> : 
          <div className={`topic-card-back`}>
            <h3><em>Answer/Response</em></h3>
            {answer}
          </div>
        }
      </div>

      <div id="overlay" hidden={modalHidden && deleteHidden}></div>
      <DeleteCardModal cardId={_id} hidden={deleteHidden} handleDelete={handleDelete}/>
      <AddCardModal cardId={_id} hidden={modalHidden} handleModal={handleModal}/>
      <div className="topic-page-btns">
        <button onClick={flipCard}>{buttonDisplay}</button>
        <button onClick={handleModal}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="divider"></div>
      <p>How prepared do you feel?</p>

      <div className="rating-container">
        <div className="hourglass" hidden={!showGreen}></div>
        <button className="btn-green" hidden={showGreen} onClick={(e) => setPrepLevel(e, setShowGreen, '#03C988')} >I got this shit on lock</button>
        <div className="hourglass" hidden={!showOrange}></div>
        <button className="btn-orange" hidden={showOrange} onClick={(e) => setPrepLevel(e, setShowOrange, '#FAAB78')}>Okay but not good enough</button>
        <div className="hourglass" hidden={!showGrey}></div>
        <button className="btn-grey" hidden={showGrey} onClick={(e) => setPrepLevel(e, setShowGrey, '#EEEEEE')}>Huh? Where am I??</button>
      </div>
    </div>
  )
}

export default TopicPage;