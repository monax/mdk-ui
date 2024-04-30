import debounce from 'debounce';
import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const fn = debounce(() => {
        setDebouncedValue(value);
      }, delay);
      fn();

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return fn.clear;
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};
