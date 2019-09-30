import React from 'react'
import './UserLoggedInfo.scss'

const UserLoggedInfo = ({loggedInUser}) =>  {
  if (!loggedInUser) {
    return <div/>
  }
  return (
  <div className='userLoggedInfo'>
    <img src={loggedInUser.profile_image_url} width={32} className='profileImage'/>
    {loggedInUser.display_name}
  </div>
)}

export default UserLoggedInfo