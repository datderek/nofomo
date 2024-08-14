import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import PostGrid from '../components/PostGrid/PostGrid';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username;
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <ProfileBanner />
      <PostGrid
        posts={posts}
        handleLoadMore={paginateHandler}
        hasMore={hasMore}
      />
    </>
  );
}
