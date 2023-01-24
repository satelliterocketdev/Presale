import './OverallStats.scss';

import { LegacyRef } from 'react';
import handleViewport from 'react-in-viewport';
import AnimatedCountdownText from '../../../components/AnimatedCountdownText';

const OverallStats = (props: {
  inViewport: boolean;
  forwardedRef: LegacyRef<HTMLDivElement>;
}) => {
  const { inViewport, forwardedRef } = props;

  return (
    <div className="grid3-txt" ref={forwardedRef}>
      <div>
        <div className="number-txt">
          $
          <AnimatedCountdownText
            from={0}
            to={34}
            duration={1}
            isAnimating={inViewport}
          />
          M+
        </div>
        <div className="number-desc">Digital Assets</div>
      </div>
      {/* <div>
        <div className="number-txt">
          <AnimatedCountdownText
            from={0}
            to={60}
            duration={1}
            isAnimating={inViewport}
          />
          K
        </div>
        <div className="number-desc">Community members</div>
      </div> */}
      <div>
        <div className="number-txt">
          <AnimatedCountdownText
            from={0}
            to={83}
            duration={1}
            isAnimating={inViewport}
          />
        </div>
        <div className="number-desc number-desc-mw">
          Different countries represented
        </div>
      </div>
    </div>
  );
};

export default handleViewport(OverallStats);
