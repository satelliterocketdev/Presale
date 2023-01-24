import './CommunitySection.scss';

import LargeDiscord from '../../../assets/img/large-discord.svg';
import RightIcon from '../../../assets/img/right-icon.svg';
import Iphone from '../../../assets/img/iPhone.png';

const CommunitySection = () => {
  return (
    <section className="community-section">
      <div className="grid2">
        <div className="join-body">
          <img
            className="large-discord"
            src={LargeDiscord}
            alt="large discord"
          />
          <div className="join-txt">Join our vibrant community.</div>
          <a
            href="https://discord.gg/JoystickGames"
            className="join-right cursor-p"
            rel="noreferrer"
            target="_blank"
          >
            <div>JOIN US ON DISCORD</div>
            <img className="right-icon-size" src={RightIcon} alt="join right" />
          </a>
        </div>
        <div className="iphone-flex">
          <img className="iphone-size" src={Iphone} alt="iphone" />
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
