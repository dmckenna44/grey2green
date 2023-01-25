import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../apiRoute";

const DeleteCardModal = (props) => {

  const navigate = useNavigate();

  const {hidden, handleDelete, cardId} = props;
  const {userId} = useParams();

  const deleteCard = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/api/deleteCard/${cardId}`)
      .then(res => {
        handleDelete(e);
        navigate(`/users/${userId}`);
      })
      .catch(err => {
        console.log('error adding card', err)
      })
  }

  
  if (hidden) return null;
  return (
    <div className="delete-card-modal">
      {/* <p className="close-modal-btn" >Close</p> */}
      <h1>Are You Sure You Want to Delete This Card?</h1>
      <div className="topic-page-btns">
        <button onClick={deleteCard}>Delete</button>
        <button onClick={handleDelete}>Go Back</button>

      </div>

    </div>
  )

}

export default DeleteCardModal;