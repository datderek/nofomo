import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './Spinner';

export default function LoadMore({ handleLoadMore, hasMore }) {
  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="h-[100px] bg-blue-200 flex justify-center items-center"
    >
      {!hasMore ? <div>No additional posts to display.</div> : <Spinner />}
    </div>
  );
}
