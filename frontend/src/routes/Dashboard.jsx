import { Link, useOutletContext } from 'react-router-dom';

export default function DashboardPage() {
  const [user] = useOutletContext();

  return (
    <>
      <h1>Dashboard page</h1>
      <p>This is a protected page.</p>
      <p>Currently logged in as {user.username}</p>
      <ul>
        <li>
          <Link to="/">Return to Home</Link>
        </li>
      </ul>
    </>
  );
}
