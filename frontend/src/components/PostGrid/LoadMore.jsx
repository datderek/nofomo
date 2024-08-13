import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LoadMore({ handleLoadMore, hasMore }) {
  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  if (!hasMore) {
    return (
      <div className="h-[100px] bg-slate-400">
        No additional posts to display.
      </div>
    );
  }

  return (
    <div ref={ref} className="h-[100px] bg-slate-400">
      Loading more...
    </div>
  );
}
