import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import PostGrid from '../components/PostGrid/PostGrid';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username;

  const [currUser] = useOutletContext();
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieves user information
  useEffect(() => {
    const controller = new AbortController();

    fetch(`http://localhost:4000/api/users/${username}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((body) =>
        setProfileData((prevProfileData) => {
          return { ...prevProfileData, ...body.data.user };
        })
      );

    return () => {
      controller.abort();
    };
  }, []);

  // Retrieves user social data (# of followers and followings)
  useEffect(() => {
    const controller = new AbortController();

    fetch(`http://localhost:4000/api/users/${username}/followers/count`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((body) =>
        setProfileData((prevProfileData) => {
          return { ...prevProfileData, followerCount: body.data.followerCount };
        })
      );

    fetch(`http://localhost:4000/api/users/${username}/following/count`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((body) =>
        setProfileData((prevProfileData) => {
          return {
            ...prevProfileData,
            followingCount: body.data.followingCount,
          };
        })
      );

    return () => {
      controller.abort();
    };
  }, []);

  // Load more posts on paginate
  useEffect(() => {
    if (isLoading || !hasMore) return; // Skip fetching if already fetching or no more posts

    setIsLoading(true);
    const controller = new AbortController();

    fetch(
      `http://localhost:4000/api/users/${username}/posts?page=${page}&limit=9`,
      { signal: controller.signal }
    )
      .then((response) => response.json())
      .then((body) => {
        if (body.data.posts.length < 9) {
          setHasMore(false);
        }

        setPosts((prevPosts) => [...prevPosts, ...body.data.posts]);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [page]);

  const paginateHandler = () => {
    // Increment page if more posts exists or not already currently fetching
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // TODO:
  // Handle when user does not exist, either redirect or display custom error or both
  if (profileData === undefined) {
    return (
      <>
        <div className="flex justify-center items-center">
          User &apos;{username}&apos; not found.
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileBanner
        profileData={profileData}
        belongsToCurrUser={currUser.username === username}
      />
      <PostGrid
        posts={posts}
        handleLoadMore={paginateHandler}
        hasMore={hasMore}
      />
    </>
  );
}
