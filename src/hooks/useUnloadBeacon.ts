import { useEffect } from 'react';

export function useUnloadBeacon(url: string | URL, enabled = true) {
  useEffect(() => {
    if (typeof navigator === 'undefined' || typeof window === 'undefined' || !enabled) return;

    function onUnload() {
      navigator.sendBeacon(url);
    }

    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [url, enabled]);
}
