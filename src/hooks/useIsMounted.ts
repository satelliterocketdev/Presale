import { useEffect, useRef } from 'react';

export const useIsMounted = () => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  return ref;
};
