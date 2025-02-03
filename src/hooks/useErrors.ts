import { type UUID, createUUID } from '@monaxlabs/mdk-schema';
import { useEffect, useState } from 'react';

export type ErrorItem<T> = {
  id: UUID;
  error: T;
  hideAt: number | null;
};

export function useErrors<T = string>(maxErrors = 0) {
  const [errors, setErrors] = useState<ErrorItem<T>[]>([]);

  useEffect(() => {
    if (errors.length === 0) return;

    const firstToHide = Math.min(...errors.map((e) => e.hideAt ?? 0));
    if (firstToHide === 0) return;

    const timeout = setTimeout(() => {
      setErrors((prev) => prev.filter((e) => !e.hideAt || e.hideAt >= Date.now()));
    }, firstToHide - Date.now());

    return () => clearTimeout(timeout);
  }, [errors]);

  return {
    errors,
    addError: (error: T, timeoutS?: number) => {
      const errorItem: ErrorItem<T> = {
        id: createUUID(),
        error,
        hideAt: timeoutS ? Date.now() + timeoutS * 1_000 : null,
      };
      setErrors((prev) => {
        const errors = [...prev, errorItem];
        if (maxErrors > 0 && errors.length > maxErrors) {
          errors.shift();
        }
        return errors;
      });
    },
    removeError: (id: UUID) => {
      setErrors((prev) => prev.filter((e) => e.id !== id));
    },
    clearErrors: () => {
      setErrors([]);
    },
  };
}
