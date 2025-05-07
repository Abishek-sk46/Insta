import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('fetched story:', data);
        setStory(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      {story ? (
        <div>
          <img
            src={story.image}
            alt="Story"
            className="rounded-circle"
            style={{ width: '200px', height: '200px' }}
          />
          <p>{story.user.username}</p>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}

export default ViewStory;
