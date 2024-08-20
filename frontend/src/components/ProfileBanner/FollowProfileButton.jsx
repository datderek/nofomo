import Button from './Button';

export default function FollowProfileButton({ isFollowing }) {
  const handleClick = () => {
    if (isFollowing) {
      // Unfollow
    } else {
      // Follow
    }
  };

  return (
    <Button handleClick={handleClick}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
