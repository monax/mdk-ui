import { useEffect, useState } from 'react';

export function useShouldRefresh(loading: boolean, doRefresh: () => void) {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (!shouldRefresh) return;
    setShouldRefresh(false);
    doRefresh();
  }, [shouldRefresh, doRefresh]);

  useEffect(() => {
    setShouldRefresh(!loading);
  }, [loading]);
}
