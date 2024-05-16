import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryStringEntries = () => {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    const entries: Record<string, string | string[]> = {};

    searchParams.forEach((_v, k) => {
      if (entries[k] !== undefined) return;

      if (k.slice(-2) === '[]') entries[k.slice(0, -2)] = searchParams.getAll(k) ?? [];
      else entries[k] = searchParams.get(k) ?? '';
    });

    return entries;
  }, [searchParams]);

  return params;
};
