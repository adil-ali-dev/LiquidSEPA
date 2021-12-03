import { useEffect, useState } from 'react';


const DELAY = 200;

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || DELAY);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}
