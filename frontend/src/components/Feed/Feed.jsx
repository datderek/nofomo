import LoadMore from '../shared/LoadMore';
import Post from './Post';

export default function Feed({ posts, handleLoadMore, hasMore }) {
  return (
    <div className="flex-grow w-full h-min">
      {posts?.map((post) => {
        return <Post key={post.id} post={post}></Post>;
      })}
      <LoadMore handleLoadMore={handleLoadMore} hasMore={hasMore} />
    </div>
  );
}
