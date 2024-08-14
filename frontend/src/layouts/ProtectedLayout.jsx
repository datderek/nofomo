import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedLayout() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (!isLoaded) return 'Loading...';

  return <Outlet context={[user]} />;
}
