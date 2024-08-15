import LoadMore from './LoadMore';
import Post from './Post';

export default function PostGrid({ posts, handleLoadMore, hasMore }) {
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-2">
        {posts?.map((post) => {
          return (
            <Post key={post.id} src={post.imageUrl} title={post.title}></Post>
          );
        })}
      </div>
      <LoadMore handleLoadMore={handleLoadMore} hasMore={hasMore} />
    </>
  );
}
