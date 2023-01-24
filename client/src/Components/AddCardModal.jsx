import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../apiRoute";

const AddCardModal = (props) => {

  const navigate = useNavigate();

  const {hidden, handleModal, cardId} = props;
  const {userId, topic} = useParams();
  
  const [topicInput, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if(cardId) {
      fetch(`${baseUrl}/api/getDetails/${cardId}`)
        .then(res => res.json())
        .then(data => {
          console.log('retrieved card', data)
          if(data) {
            setTopic(data.topic);
            setPrompt(data.question);
            setResponse(data.answer);
          }
        })
    }
  }, [])

  const submitCard = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/api/addOrUpdateCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userId,
        topic: topicInput,
        prompt: prompt,
        response: response,
        id: cardId ? cardId : null
      })
    }).then(res => res.json())
      .then(data => {
        console.log('data from edit modal', data)
        if(data.updated) {
          navigate(`/users/${userId}/topics/${data.details.topic}`, {state: {details: data.details}});
          handleModal(e);
        } else {
          location.reload();
        }
      }).catch(err => {
        console.log('error adding card', err)
      })
  }

  
  if (hidden) return null;
  return (
    <div className="add-card-modal">
      <p className="close-modal-btn" onClick={handleModal}>Close</p>
      <h1>{cardId ? 'Update Card' : 'Add a New Card!'}</h1>

      <form action="" className="modal-form">
        <label>Topic</label>
        <input type="text" value={topicInput} required onInput={(e) => setTopic(e.target.value)}/>
        <label>Question/Prompt</label>
        <textarea id="" value={prompt} cols="60" rows="5" required onInput={(e) => setPrompt(e.target.value)}></textarea>
        <label>Answer/Response</label>
        <textarea id="" value={response} cols="60" rows="8" required onInput={(e) => setResponse(e.target.value)}></textarea>
        <button onClick={submitCard}>Submit</button>
      </form>

      <div className="response-reminders">
        <p>Tips</p>
        <ul>
          <li>Make interviewer care/Relate answer to experience</li>
          <li>Focus on mature engineering decisions</li>
          <li>Identify shortcomings/Weigh pros and cons</li>
        </ul>
      </div>
    </div>
  )

}

export default AddCardModal;