import React, { useState } from 'react';

function Notification({request, removeNotification, setRemoveNotification}) {
  const [error, setError] = useState('');

  const acceptFriend = () => {
    const token = localStorage.getItem('jwt');
    fetch(`/api/users/loggedInUser/friends/${request._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      }})
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMessage) {
        // Handle custom Error response sent from API
        setError(data.errorMessage);
      }
      setRemoveNotification(data);
    })
  }

  const removeError = () => {
    setError('');
  }

  return (
    <div className="card shadow-sm" id={`notification${request.name}`}>
      <div className="card-body text-center">
        <h5 className="card-title"><span className='text-primary fw-bold'>{request.name}</span> sent you a friend request.</h5>
        <button className="btn btn-primary" onClick={acceptFriend}>Accept Request</button>
      </div>
      {error &&
        <div className="alert alert-danger py-1 mt-5" role="alert">
          {error}
          <button type="button" className="btn-close ps-5" onClick={removeError}></button>
        </div>
      }
    </div>
  )
}

export default Notification
