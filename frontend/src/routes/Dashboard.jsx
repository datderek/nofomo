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
      <div className="w-screen h-screen flex justify-center">
        <div className="max-w-[1200px] w-full grid grid-cols-[250px_1fr_250px] gap-x-6">
          <div className="h-full bg-blue-200"></div>
          <div className="flex-grow w-full h-full bg-red-200"></div>
          <div className="h-full bg-green-200"></div>
        </div>
      </div>
    </>
  );
}
