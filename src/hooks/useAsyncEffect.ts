import { type DependencyList, useEffect } from 'react';

export const useAsyncEffect = (asyncCallable: () => Promise<void>, deps: DependencyList): void => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    asyncCallable();
  }, deps);
};
