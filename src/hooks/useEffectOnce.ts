import React from 'react';

export function useEffectOnce(fn: () => void, shouldTrigger = true) {
  const called = React.useRef(false);
  if (shouldTrigger && !called.current) {
    called.current = true;
    fn();
  }
}
