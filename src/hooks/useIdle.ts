import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';

export const useIdle = (ms = 1000 * 60) => {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleTimeout = () => {
      setIdle(true);
    };

    const handleEvent = throttle(() => {
      setIdle(false);

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleTimeout, ms);
    }, 200);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleEvent();
      }
    };

    timeoutId = window.setTimeout(handleTimeout, ms);

    window.addEventListener('mousemove', handleEvent);
    window.addEventListener('mousedown', handleEvent);
    window.addEventListener('resize', handleEvent);
    window.addEventListener('keydown', handleEvent);
    window.addEventListener('touchstart', handleEvent);
    window.addEventListener('wheel', handleEvent);
    window.addEventListener('scroll', handleEvent);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleEvent);
      window.removeEventListener('mousedown', handleEvent);
      window.removeEventListener('resize', handleEvent);
      window.removeEventListener('keydown', handleEvent);
      window.removeEventListener('touchstart', handleEvent);
      window.removeEventListener('wheel', handleEvent);
      window.removeEventListener('scroll', handleEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.clearTimeout(timeoutId);
    };
  }, [ms]);

  return idle;
};
