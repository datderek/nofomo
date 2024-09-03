import { useEffect, useState } from 'react';

export default function useFollowingPosts(getToken, limit = 9) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = () => {
    if (hasMorePosts && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Prevent fetch is there are no posts or we are already fetching
    if (!hasMorePosts || isLoading) return;

    const controller = new AbortController();

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/posts/following?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
            signal: controller.signal,
          }
        );

        const body = await response.json();
        setIsLoading(false);

        if (body.data.status === 'fail') {
          throw new Error(body.data.message || 'Failed to fetch posts');
        }

        if (body.status === 'error') {
          throw new Error(body.message || 'An error occurred on the server');
        }

        if (body.data.posts.length < limit) {
          setHasMorePosts(false);
        }

        setPosts((prevPosts) => [...prevPosts, ...body.data.posts]);
      } catch (err) {
        setError(err);
      }
    };

    fetchPostData();

    return () => {
      controller.abort();
    };
  }, [page, limit]);

  return { posts, hasMorePosts, loadMorePosts, error, isLoading };
}
