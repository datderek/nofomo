import { ProfileIcon } from '../shared/ProfileIcon';

export default function CreatePostButton() {
  return (
    <div className="mb-6 w-full p-4 flex border rounded-lg bg-white shadow transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.01]">
      <div className="mr-2">
        <ProfileIcon width={40} />
      </div>
      <div className="flex-auto h-10 px-5 rounded-full border flex items-center select-none">
        Got something to share?
      </div>
    </div>
  );
}
