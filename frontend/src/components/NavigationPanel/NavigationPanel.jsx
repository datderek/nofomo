import { useOutletContext } from 'react-router-dom';
import ProfileIcon from '../shared/ProfileIcon';

export default function NavigationPanel() {
  const [currUser] = useOutletContext();

  return (
    <div className="sticky top-navbar h-min p-2">
      <div className="flex flex-col gap-y-4 items-center w-full">
        <ProfileIcon width={'h-36'} />
        <div>
          <div className="text-center text-2xl font-medium">
            {currUser.fullName}
          </div>
          <div className="text-center">@{currUser.username}</div>
        </div>
        <div className="w-[150px] px-4 py-2 rounded-xl text-left bg-gray-800 text-white font-medium text-xl">
          Feed
        </div>
        <div className="w-[150px] px-4 py-2 rounded-xl text-left font-medium text-xl">
          Explore
        </div>
        <div className="w-[150px] px-4 py-2 rounded-xl text-left font-medium text-xl">
          Calendar
        </div>
      </div>
    </div>
  );
}
