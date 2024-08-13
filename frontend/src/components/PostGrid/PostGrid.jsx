import Post from './Post';

export default function PostGrid() {
  const posts = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-full grid grid-cols-3 gap-2 bg-red-50">
      {posts.map((post) => {
        return <Post key={post}></Post>;
      })}
    </div>
  );
}
