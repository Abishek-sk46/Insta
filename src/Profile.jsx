import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Profile() {
    const [profile,setprofile] = useState(null);

    const [followers , setfollowers] = useState([]);      
    
    const [unfollowed, setunfollowed] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:3000/profile')
        .then(data => {setprofile(data.data); console.log(data)})
        .catch(err=> console.log(err))

        axios.get('http://localhost:3000/followers')
        .then(data =>{ setfollowers(data.data); console.log(data)})
        .catch(err=> console.log(err) )



    },[unfollowed])


    function HandleOnChange(e){
        setprofile(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleupadte = async ()=>{
        axios.put('http://localhost:3000/profile',profile)
        .then(console.log("Updated"))
        .catch(err => console.log(err))
    }

    const handleunfollow = async (id)=>{
        axios.delete(`http://localhost:3000/followers/${id}`)
        .then(alert("unfollowed"))
        .then(setunfollowed(prev => prev+1))
        .catch(err=>console.log(err))
    }


  return (
    <div className='m-5'>
        {profile ?
        (
            <div>
                <img src={profile.profile_pic} className='profile rounded-circle' alt="" />
               <h5>{profile.username}</h5> 

               <input type="text" value={profile.username} name="username" className='form-control my-4' onChange={HandleOnChange}/>

               <input type="text" name='profile_pic' value={profile.profile_pic} className='form-control' onChange={HandleOnChange} />

               <button className='btn btn-primary my-4' onClick={handleupadte}>Update</button>
            </div>
        ):
        (
            <div>Loading..</div>
        )
        }

        {followers.length>0?(
            followers.map(follower => (
                <div key={follower.id} className='d-flex my-2'>
                    {follower.username}
                    <button className='btn btn-secondary ms-auto' onClick={()=>{handleunfollow(follower.id)}}>un follow</button>
                </div>
            ))
        ):(
            <div>Loading....</div>
        )}
    </div>
  )
}

export default Profile