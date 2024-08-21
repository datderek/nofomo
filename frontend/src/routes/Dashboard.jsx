import { useOutletContext } from 'react-router-dom';
import NavigationPanel from '../components/NavigationPanel/NavigationPanel';
import useFollowingPosts from '../hooks/useFollowingPosts';

export default function DashboardPage() {
  const [currUser, getToken] = useOutletContext();
  const { posts, hasMorePosts, loadMorePosts } = useFollowingPosts(getToken);
  console.log(currUser, posts, hasMorePosts, loadMorePosts);
  return (
    <>
      <div className="w-screen min-h-screen flex justify-center">
        <div className="max-w-[1200px] h-[1000px] w-full grid grid-cols-[250px_1fr_250px] gap-x-6">
          <NavigationPanel />
          <div className="flex-grow w-full h-full bg-red-200"></div>
          <div className="sticky top-navbar flex-none h-[400px] bg-green-200"></div>
        </div>
      </div>
    </>
  );
}
