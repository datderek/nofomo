import { useClerk } from '@clerk/clerk-react';
import Button from './Button';

export default function EditProfileButton() {
  const { openUserProfile } = useClerk();

  const handleClick = () => {
    openUserProfile();
  };

  return <Button handleClick={handleClick}>Edit Profile</Button>;
}
