import { useOutletContext, useParams } from 'react-router-dom';
import usePost from '../hooks/usePost';

export default function PostPage() {
  const params = useParams();
  const postId = params.postId;
  const [, getToken] = useOutletContext();
  const { post } = usePost(getToken, postId);

  console.log(post);
  return <></>;
}
