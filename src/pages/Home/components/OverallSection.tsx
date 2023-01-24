import './OverallSection.scss';

import MapImg from '../../../assets/img/worldmap.png';
import OverallStats from './OverallStats';

const OverallSection = ({test}: {test?: boolean}) => {
  return (
    <>
      <div className="mobile-map">
        <img src={MapImg} alt="map" />
      </div>

      <section className="overall-section">
        <div className="overall-section-wrapper">
          <div className="blur30" />
          <div className="together-txt">
            Together we&rsquo;ll impact the<br/>gaming world as one
          </div>
          <div className="crypto-txt">
            Joystick makes taking the leap into blockchain gaming as seamless and profitable as possible. We do this by providing access to the best gaming assets, a full suite of in-depth education resources, and a strong community foundation to support players on their gaming &amp; earning journey.
          </div>

          <OverallStats />
        </div>
      </section>
    </>
  );
};

export default OverallSection;
