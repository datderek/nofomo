import Button from './Button';

export default function FollowProfileButton({
  isFollowing,
  toggleFollowStatus,
}) {
  return (
    <Button handleClick={toggleFollowStatus}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
