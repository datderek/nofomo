// Import the layouts
import RootLayout from '../layouts/RootLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';

// Import the components
import HomePage from '../routes/Home';
import SignInPage from '../routes/SignIn';
import SignUpPage from '../routes/SignUp';
import DashboardPage from '../routes/Dashboard';

const routes = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <ProtectedLayout />,
        children: [{ path: '/dashboard', element: <DashboardPage /> }],
      },
    ],
  },
];

export default routes;
