import { useOutletContext, useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';
import Post from '../components/Post/Post';
import NavigationPanel from '../components/NavigationPanel/NavigationPanel';

export default function PostPage() {
  const params = useParams();
  const postId = params.postId;
  const [, getToken] = useOutletContext();
  const { post } = usePost(getToken, postId);

  console.log(post);

  const postData = {
    username: 'jdawg',
    createdAt: 'December 17, 1995 03:24:00',
    pfpUrl: 'https://picsum.photos/200',
    imageUrl: 'https://picsum.photos/1000',
    title: 'Lorem ipsum title',
    location: 'Acacia Park',
    eventStart: 'Dec 8th, 9:00 AM',
    eventEnd: 'Dec 10th, 7:00 AM',
  };

  return (
    <>
      <div className="w-screen h-min flex justify-center">
        <div className="max-w-[1200px] h-min w-full grid grid-cols-[250px_1fr_250px] gap-x-6">
          <NavigationPanel />
          <div className="flex-grow w-full h-min">
            {postData && <Post post={postData} />}
          </div>
          <div className="sticky top-navbar flex-none"></div>
        </div>
      </div>
    </>
  );
}
