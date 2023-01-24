import { useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';

const AnimatedCountdownText = ({
  from,
  to,
  duration,
  isAnimating,
}: {
  from: number;
  to: number;
  duration: number;
  isAnimating: boolean;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  const { start, reset } = useCountUp({
    ref: ref,
    start: from,
    end: to,
    duration,
  });

  useEffect(() => {
    if (isAnimating) {
      start();
    } else {
      reset();
    }
  }, [isAnimating, reset, start]);

  return <span ref={ref}></span>;
};

export default AnimatedCountdownText;
