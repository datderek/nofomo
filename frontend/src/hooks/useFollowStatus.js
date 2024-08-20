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

  const toggleFollowStatus = async () => {
    const response = await fetch(
      `http://localhost:4000/api/users/${username}/${isFollowing ? 'unfollow' : 'follow'}`,
      {
        method: isFollowing ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    const body = await response.json();

    if (body.status === 'success') {
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } else if (body.status === 'fail') {
      // TODO: Implement error handingling
      alert('Failed');
    } else {
      alert('Server error');
    }
  };

  return { isFollowing, toggleFollowStatus, isLoading, error };
}
