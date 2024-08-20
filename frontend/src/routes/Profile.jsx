import useProfileData from '../hooks/useProfileData';
import useUserPosts from '../hooks/useUserPosts';
import { useParams, useOutletContext } from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import PostGrid from '../components/PostGrid/PostGrid';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username;

  const [currUser] = useOutletContext();
  const { profileData } = useProfileData(username);
  const { posts, hasMorePosts, loadMorePosts } = useUserPosts(username);

  // TODO:
  // Handle when user does not exist, either redirect or display custom error or both
  if (profileData === undefined) {
    return (
      <>
        <div className="flex justify-center items-center">
          User &apos;{username}&apos; not found.
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileBanner
        profileData={profileData}
        belongsToCurrUser={currUser.username === username}
      />
      <PostGrid
        posts={posts}
        handleLoadMore={loadMorePosts}
        hasMore={hasMorePosts}
      />
    </>
  );
}
