import { useState, useEffect } from 'react';

export default function usePost(getToken, postId) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const controller = new AbortController();

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/posts/${postId}`,
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
          throw new Error(body.data.message || 'Failed to fetch post');
        }

        if (body.status === 'error') {
          throw new Error(body.message || 'An error occurred on the server');
        }

        setPost(body.data.post);
      } catch (err) {
        setError(err);
      }
    };

    fetchPostData();

    return () => {
      controller.abort();
    };
  }, [postId]);

  return { post, error, isLoading };
}
