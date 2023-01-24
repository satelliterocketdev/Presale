import './Loader.scss';

import { useLayoutEffect, useRef } from 'react';
import { Spinner } from 'spin.js';

const opts = {
  lines: 9, // The number of lines to draw
  length: 0, // The length of each line
  width: 5, // The line thickness
  radius: 8, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ffffff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute', // Element positioning
};

const Loader = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      new Spinner(opts).spin(ref.current);
    }
  }, []);

  return <span className="presale-loader" ref={ref}></span>;
};

export default Loader;
