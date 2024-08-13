import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import PostGrid from '../components/PostGrid/PostGrid';

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
      <div className="flex flex-row h-full">
        <div className="max-w-[800px] mx-auto bg-blue-100">
          <div>{JSON.stringify(posts)}</div>
          <ProfileBanner />
          <PostGrid />
        </div>
      </div>
    </>
  );
}
