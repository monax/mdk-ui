import { useEffect, useMemo, useState } from 'react';

export const useIsInViewport = (ref: React.MutableRefObject<Element | null>, options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), options),
    [options],
  );

  useEffect(() => {
    if (!ref.current) return;

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return { isVisible };
};
