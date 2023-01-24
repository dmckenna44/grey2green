import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState} from 'react'


const Square = ({details}) => {
  const navigate = useNavigate();
  const {userId} = useParams();

  const goToTopic = (e) => {
    e.preventDefault();
    navigate(`/users/${userId}/topics/${details.topic}`, {state: {details: details}})
  }

  return (
    <div className="square-display" onClick={goToTopic} style={{backgroundColor: details.color}}>
      <p>{details ? details.topic : null}</p>
    </div>
  )
}

export default Square;