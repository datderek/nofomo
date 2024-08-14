import BannerButton from './BannerButton';

export default function ProfileBanner({ user, belongsToCurrUser }) {
  return (
    <div className="w-full px-4 py-2 grid grid-cols-3 grid-rows-[repeat(3,min-content)_1fr] border border-black">
      <div className="col-span-1 row-span-full mx-auto">
        <img
          className="h-[150px] aspect-square rounded-full bg-gray-300"
          src={user.imageUrl}
          alt={`Profile picture of ${user.username}`}
        />
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-3 flex justify-center items-center">
        <BannerButton belongsToCurrUser={belongsToCurrUser} />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-1 text-2xl leading-tight ">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-lg leading-tight mb-2">@{user.username}</div>
      <div className="col-start-2 col-end-4 w-full flex gap-x-10 mb-2 ">
        <div>XX posts</div>
        <div>XX followers</div>
        <div>XX following</div>
      </div>
      <div className="col-start-2 col-end-4 text-sm">
        This would be where my bio is. Note that bio should not exceed probably
        around two hundred characters. This example has a length of about 150
        characters.
      </div>
    </div>
  );
}
