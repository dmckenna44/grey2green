import React from "react"

const SessionExpModal = (props) => {
  const {sessionExp} = props;
  

  <div id="session-exp-modal" hidden={sessionExp} style={{display: sessionExp ? 'none' : 'flex'}}>
    Session Expired, Redirecting...
    <div className="loader"></div>
  </div>

}

export default SessionExpModal;