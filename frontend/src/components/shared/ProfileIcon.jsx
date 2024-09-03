import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProfileIcon({ size = 'h-36' }) {
  const [currUser] = useOutletContext();

  return (
    <Link to={`/${currUser.username}`}>
      <img
        src={currUser.imageUrl}
        className={`${size} aspect-square rounded-full border bg-gray-300`}
      />
    </Link>
  );
}
