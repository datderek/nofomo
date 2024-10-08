import EditProfileButton from './EditProfileButton';
import FollowProfileButton from './FollowProfileButton';

export default function ProfileBanner({
  profileData,
  belongsToCurrUser,
  isFollowing,
  toggleFollowStatus,
}) {
  return (
    <div className="w-full px-4 py-2 grid grid-cols-3 grid-rows-[1fr_min-content_1fr] mb-10">
      <div className="col-span-1 row-span-full mx-auto">
        <img
          className="h-[150px] aspect-square rounded-full border bg-gray-300"
          src={profileData.imageUrl}
          alt={`Profile picture of ${profileData.username}`}
        />
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-3 self-center">
        {belongsToCurrUser ? (
          <EditProfileButton />
        ) : (
          <FollowProfileButton
            username={profileData.username}
            isFollowing={isFollowing}
            toggleFollowStatus={toggleFollowStatus}
          />
        )}
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-1 self-end text-2xl leading-tight">
        {profileData.firstName} {profileData.lastName}
      </div>
      <div className="text-lg leading-tight mb-2">@{profileData.username}</div>
      <div className="col-start-2 col-end-4 w-full flex gap-x-10 mb-2 ">
        <div>{profileData.postCount} posts</div>
        <div>{profileData.followerCount} followers</div>
        <div>{profileData.followingCount} following</div>
      </div>
    </div>
  );
}
