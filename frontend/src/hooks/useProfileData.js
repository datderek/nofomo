import { useState, useEffect } from 'react';

export default function useProfileData(username) {
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/users/${username}/profile`,
          {
            signal: controller.signal,
          }
        );

        const body = await response.json();
        setIsLoading(false);

        if (body.status === 'fail') {
          throw new Error(body.data.message || 'Failed to fetch profile data');
        }

        if (body.status === 'error') {
          throw new Error(body.message || 'An error occurred on the server');
        }

        setProfileData(body.data.profileData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchProfileData();

    return () => {
      controller.abort();
    };
  }, [username]);

  return { profileData, error, isLoading };
}
