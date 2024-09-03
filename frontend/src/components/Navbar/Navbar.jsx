import { Link } from 'react-router-dom';
import { SignedIn, UserButton } from '@clerk/clerk-react';

export default function Navbar() {
  return (
    <nav className="fixed z-50 h-14 w-full bg-white">
      <div className="mx-auto h-full max-w-[900px] px-8 flex justify-center items-center">
        <div className="flex-none mr-12">
          <Link to="/dashboard">
            <div className="w-16 h-8 flex justify-center items-center bg-gray-800 text-white font-bold">
              ICON
            </div>
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-none h-6 w-6 absolute right-4 fill-gray-300"
            viewBox="0 0 24 24"
          >
            <title>magnify</title>
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
          <input
            type="text"
            placeholder="Find your friends..."
            className="h-8 w-full px-4 rounded-full shadow-inner border border-gray-300"
          />
        </div>
        <div className="flex-none ml-12">
          <div className="flex justify-center">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-9 h-9',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
