import { useEffect } from 'react';

export function useVisibilityHidden(onHidden: () => void, enabled = true) {
  useEffect(() => {
    if (typeof navigator === 'undefined' || typeof document === 'undefined' || !enabled) return;

    function onVisibilityChange() {
      if (document.visibilityState !== 'hidden') return;
      onHidden();
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [enabled, onHidden]);
}
