import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AddCardModal from "./AddCardModal";
import baseUrl from "../apiRoute";


const TopicPage = (props) => {

  const navigate = useNavigate();
  const {userId} = useParams();
  console.log('params', useParams())

  const location = useLocation();
  const {answer, question, topic, _id} = location.state.details;

  const [showAnswer, setShowAnswer] = useState(false);
  const [modalHidden, toggleModal] = useState(true)

  let buttonDisplay = showAnswer ? 'Show Question' : 'Show Answer'

  const flipCard = (e) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
    console.log(showAnswer)
  }

  const setPrepLevel = (e, color) => {
    e.preventDefault();
    fetch(`${baseUrl}/api/updateCardPrep`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: _id,
        color: color
      })
    }).then(res => res.json())
      .then(data => {
        alert('Topic Updated! Keep it up!')
      })
  }

  const handleModal = (e) => {
    e.preventDefault();
    toggleModal(!modalHidden);
  }

  const returnToProf = (e) => {
    e.preventDefault();
    navigate(`/users/${userId}`)
  }
  
  return (
    <div className="topic-page-container">
      <a className="back-to-prof-link" onClick={returnToProf} >← Back to Profile</a>
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
      <div id="overlay" hidden={modalHidden}></div>
      <AddCardModal cardId={_id} hidden={modalHidden} handleModal={handleModal}/>
      <div className="topic-page-btns">
        <button onClick={flipCard}>{buttonDisplay}</button>
        <button onClick={handleModal}>Edit</button>
      </div>
      <div className="divider"></div>
        <p>How do you feel about {topic}?</p>

      <div className="rating-container">
        <button className="btn-green" onClick={(e) => setPrepLevel(e, '#03C988')} >I got this shit on lock</button>
        <button className="btn-orange" onClick={(e) => setPrepLevel(e, '#FAAB78')}>Okay but not good enough</button>
        <button className="btn-grey" onClick={(e) => setPrepLevel(e, '#EEEEEE')}>Huh? Where am I??</button>
      </div>
    </div>
  )
}

export default TopicPage;