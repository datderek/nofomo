import BannerButton from './BannerButton';

export default function ProfileBanner({ user, belongsToCurrUser }) {
  return (
    <div className="w-full px-4 py-2 grid grid-cols-3 grid-rows-[1fr_min-content_1fr] mb-10">
      <div className="col-span-1 row-span-full mx-auto">
        <img
          className="h-[150px] aspect-square rounded-full bg-gray-300"
          src={user.imageUrl}
          alt={`Profile picture of ${user.username}`}
        />
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-3 self-center">
        <BannerButton belongsToCurrUser={belongsToCurrUser} />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-1 self-end text-2xl leading-tight">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-lg leading-tight mb-2">@{user.username}</div>
      <div className="col-start-2 col-end-4 w-full flex gap-x-10 mb-2 ">
        <div>XX posts</div>
        <div>XX followers</div>
        <div>XX following</div>
      </div>
    </div>
  );
}
