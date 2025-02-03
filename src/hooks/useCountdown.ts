import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Date or seconds */
  duration: Date | number;
  onEnd?: () => void | Promise<void>;
  enabled: boolean;
};

export function useCountdown({ duration, onEnd, enabled }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const executedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    executedRef.current = false;
    const seconds = typeof duration === 'number' ? duration : Math.floor((duration.getTime() - Date.now()) / 1000);
    setSecondsLeft(Math.max(0, seconds));
  }, [duration, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!executedRef.current) {
            executedRef.current = true;
            onEnd?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, onEnd]);

  return secondsLeft;
}
