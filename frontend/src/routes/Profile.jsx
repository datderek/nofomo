import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/users/${username}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <h1>Profile Page</h1>
      <p>You are visiting {params.username}</p>
      <p>{JSON.stringify(posts)}</p>
    </>
  );
}
