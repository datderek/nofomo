import { timeSince } from '../../utils/utils';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  return (
    <Link to={`/post/${post.id}`}>
      <div className="border mb-6 rounded-2xl p-4 shadow transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.01] cursor-pointer">
        <div className="mb-2 flex items-center">
          <img
            src={post.pfpUrl}
            className="flex-none h-10 w-10 bg-slate-300 rounded-full mr-2"
          />
          <div>
            <div className="leading-tight">@{post.username}</div>
            <div className="text-sm leading-tight">
              {timeSince(new Date(post.createdAt))}
            </div>
          </div>
        </div>
        <div className="mb-2 text-lg px-2">{post.title}</div>
        <img
          src={post.imageUrl}
          className="mb-1 h-auto max-h-[60vh] w-full rounded-2xl object-cover object-center"
        />
        <div className="h-6 px-2 flex items-center text-xs text-gray-400">
          {post.location && (
            <>
              <svg
                className="h-4 w-4 fill-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>map-marker-outline</title>
                <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
              </svg>
              {post.location}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
