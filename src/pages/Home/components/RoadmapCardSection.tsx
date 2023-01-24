import './RoadmapCardSection.scss';

import RightIcon from '../../../assets/img/right-icon.svg';
import RoadmapIcon from '../../../assets/img/roadmap-icon.svg';

const RoadmapCardSection = () => {
  return (
    <section className="roadmap-card-section">
      <div className="grid2">
        <div className="icon-part">
          <img className="roadmap-icon" src={RoadmapIcon} alt="roadmap" />
        </div>
        <div className="text-part">
          <div className="join-txt">Check out our exciting roadmap</div>
          <a
            href="https://docs.joystickgames.com/"
            className="join-right cursor-p"
            rel="noreferrer"
            target="_blank"
          >
            <div>VIEW ON OUR DOCS</div>
            <img className="right-icon-size" src={RightIcon} alt="join right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoadmapCardSection;
