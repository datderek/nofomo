import { useState, useEffect } from 'react';

export default function useFollowStatus(username, getToken) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFollowStatus = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/users/me/following/${username}`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
            signal: controller.signal,
          }
        );

        const body = await response.json();
        setIsLoading(false);

        if (body.status === 'error') {
          throw new Error(body.message);
        } else if (body.status === 'fail') {
          setIsFollowing(false);
        } else {
          setIsFollowing(true);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchFollowStatus();

    return () => {
      controller.abort();
    };
  }, [username]);

  return { isFollowing, isLoading, error };
}
