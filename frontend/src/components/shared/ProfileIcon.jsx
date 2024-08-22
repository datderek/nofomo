import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProfileIcon({ width = 40 }) {
  const [currUser] = useOutletContext();

  return (
    <Link to={`/${currUser.username}`}>
      <img
        src={currUser.imageUrl}
        className={`h-[${width}px] w-[${width}px] rounded-full border bg-gray-300`}
      />
    </Link>
  );
}
