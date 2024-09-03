import { useState } from 'react';
import ProfileIcon from '../shared/ProfileIcon';
import PostFormModal from './PostFormModal';

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="mb-6 w-full p-4 flex border rounded-lg bg-white shadow transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.01]"
      >
        <div className="mr-2">
          <ProfileIcon size={'h-9'} />
        </div>
        <div className="flex-auto h-9 px-5 rounded-full border flex items-center select-none">
          Got something to share?
        </div>
      </div>
      <PostFormModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
