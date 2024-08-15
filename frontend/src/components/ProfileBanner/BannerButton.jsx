import { useClerk } from '@clerk/clerk-react';

export default function BannerButton({ belongsToCurrUser }) {
  const { openUserProfile } = useClerk();

  const handleClick = () => {
    openUserProfile();
  };

  if (belongsToCurrUser) {
    return (
      <button
        className="text-lg px-6 py-1 bg-slate-200 rounded-lg transform transition-transform transition-color hover:bg-slate-300 hover:scale-105"
        onClick={handleClick}
      >
        Edit Profile
      </button>
    );
  }

  return (
    <button className="text-lg px-6 py-1 bg-slate-200 rounded-lg">
      Follow
    </button>
  );
}
