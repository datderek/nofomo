import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default function ProtectedLayout() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (isLoaded && !!user) {
    return (
      <>
        <Navbar />
        <div className="h-screen pt-20">
          <Outlet context={[user, getToken]} />;
        </div>
      </>
    );
  } else {
    return 'Loading...';
  }
}
