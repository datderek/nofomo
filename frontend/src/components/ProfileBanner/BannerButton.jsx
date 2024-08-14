import { useClerk } from '@clerk/clerk-react';

export default function BannerButton({ belongsToCurrUser }) {
  const { openUserProfile } = useClerk();

  const handleClick = () => {
    openUserProfile();
  };

  if (belongsToCurrUser) {
    return (
      <button
        className="text-lg px-6 py-1 bg-slate-200 rounded-lg"
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
