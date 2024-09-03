import useProfileData from '../hooks/useProfileData';
import useUserPosts from '../hooks/useUserPosts';
import useFollowStatus from '../hooks/useFollowStatus';
import { useParams, useOutletContext } from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import PostGrid from '../components/PostGrid/PostGrid';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username;

  const [currUser, getToken] = useOutletContext();
  const { profileData } = useProfileData(username);
  const { isFollowing, toggleFollowStatus } = useFollowStatus(
    username,
    getToken
  );
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
    <div className="max-w-[750px] mx-auto">
      <ProfileBanner
        profileData={profileData}
        belongsToCurrUser={currUser.username === username}
        isFollowing={isFollowing}
        toggleFollowStatus={toggleFollowStatus}
      />
      <PostGrid
        posts={posts}
        handleLoadMore={loadMorePosts}
        hasMore={hasMorePosts}
      />
    </div>
  );
}
