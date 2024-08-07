import { Link, useOutletContext } from 'react-router-dom';

export default function DashboardPage() {
  const [userId] = useOutletContext();
  return (
    <>
      <h1>Dashboard page</h1>
      <p>This is a protected page.</p>
      <p>Currently logged in as {userId}</p>
      <ul>
        <li>
          <Link to="/">Return to Home</Link>
        </li>
      </ul>
    </>
  );
}
