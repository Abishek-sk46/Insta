import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Suggestions() {

  const [profile, setprofile] = useState(null);
  const [Suggestions, setSuggestions] = useState([]);



useEffect(()=>{
  fetch('http://localhost:3000/profile')
  .then(response=>response.json())
  .then(data=> setprofile(data))
  .catch(err => console.log(err))

  fetch('http://localhost:3000/suggestions') // Updated endpoint for suggestions
  .then(response=>response.json())
  .then(data=> setSuggestions(data))
  .catch(err => console.log(err))
})

const handlefollow = async (id, username)=>{
  axios.post('http://localhost:3000/followers', {"id":id , "username":username})
  .then(alert('followed'))
  .catch(err=> console.log(err))
}

  return (

    <div>
      <div className='suggestions w-75 m-4'>
        {profile?(
        <div  className='d-flex'>
                  <img className='dp rounded-circle' src={profile?.profile_pic} alt="" /> {/* Updated to use profile state */}
                    <h5>{profile?.username}</h5>
                   <small className='ms-auto text-primary'>Switch</small>
         </div>
        ) : (
          <p>No profile available</p>
        )}

        <div className='d-flex'>
          <p>Suggested For you</p>
          <b className='ms-auto'>See All</b>
        </div>
        {Suggestions.length > 0 ? (
          <div className='d-flex flex-column'>
            {Suggestions.map((suggestion) => (
              <div key={suggestion.id} className='d-flex my-2'>
                <img className='dp rounded-circle' src={suggestion.profile_pic} alt="" />
                <div className='ms-2'>
                  <h5>{suggestion.username}</h5>
                  <a className='text-primary ms-auto' onClick={()=>{handlefollow(suggestion.id, suggestion.username)}}>Follow</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
    </div>
  )
}

export default Suggestions