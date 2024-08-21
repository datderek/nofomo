import { useOutletContext } from 'react-router-dom';
import Feed from '../components/Feed/Feed';
import NavigationPanel from '../components/NavigationPanel/NavigationPanel';
import useFollowingPosts from '../hooks/useFollowingPosts';

export default function DashboardPage() {
  const [, getToken] = useOutletContext();
  const { posts, hasMorePosts, loadMorePosts } = useFollowingPosts(getToken, 3);

  return (
    <>
      <div className="w-screen min-h-screen flex justify-center">
        <div className="max-w-[1200px] h-min w-full grid grid-cols-[250px_1fr_250px] gap-x-6">
          <NavigationPanel />
          <Feed
            posts={posts}
            handleLoadMore={loadMorePosts}
            hasMore={hasMorePosts}
          />
          <div className="sticky top-navbar flex-none"></div>
        </div>
      </div>
    </>
  );
}
