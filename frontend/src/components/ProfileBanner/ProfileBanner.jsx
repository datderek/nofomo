export default function ProfileBanner() {
  return (
    <div className="w-full px-4 py-2 grid grid-cols-[1fr_2fr] grid-rows-[repeat(3,min-content)_1fr] border border-black">
      <div className="col-span-1 row-span-full mx-auto">
        <div className="h-[150px] aspect-square rounded-full bg-gray-300" />
      </div>
      <div className="text-2xl leading-tight">Derek Tran</div>
      <div className="text-lg leading-tight mb-2">@datderek</div>
      <div className="w-full flex gap-x-10 mb-2">
        <div>XX posts</div>
        <div>XX followers</div>
        <div>XX following</div>
      </div>
      <div className="text-sm">
        This would be where my bio is. Note that bio should not exceed probably
        around two hundred characters. This example has a length of about 150
        characters.
      </div>
    </div>
  );
}
