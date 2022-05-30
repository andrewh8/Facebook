import React from 'react';

function Notification({request}) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{request.name} sent you a friend request. Id is {request._id}</h5>
        {/* <button class="btn btn-primary" onClick={acceptRequest}>Accept Request</button> */}
      </div>
    </div>
  )
}

export default Notification
