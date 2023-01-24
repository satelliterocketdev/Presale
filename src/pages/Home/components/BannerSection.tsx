import './BannerSection.scss';

import { MutableRefObject, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';

import Illluvinm from '../../../assets/img/iIlluvium.png';
import BigImg from '../../../assets/img/big-time2.png';
import DefiImg from '../../../assets/img/defi-kingdoms.png';
import AuroryImg from '../../../assets/img/aurory.png';
import AxieImg from '../../../assets/img/axie.png';
import ThetanImg from '../../../assets/img/thetan-arena.png';

const BannerSection = ({test}: {test?: boolean}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { inViewport } = useInViewport(ref as MutableRefObject<HTMLElement>, undefined, {
    disconnectOnLeave: true,
  });

  return (
    <>
      <div className="txt1-bg" />
      <div className="txt2-bg" />
      <div
        ref={ref}
        className={`main-img ${
          inViewport ? 'animate__animated animate__fadeInUp' : ''
        }`}
      />
      <section className="banner-section">
        <div className="banner-section-wrapper">
          <div className="gaming-dao">
            A Next Gen<br/>Gaming Ecosystem
          </div>
          <div className="dao-community-txt">
            <h1 style={{fontSize: '34px'}}>
              Joystick empowers players to make money<br/>playing the games they love
            </h1>
          </div>
          {/* <a href="https://rent.joystickgames.com/" className="btn-sale" target="_blank" rel='noreferrer'>
            Play Now
          </a> */}
          <a href="/" className="btn-sale">
            Coming Soon
          </a>
          <div className="grid3-btn">
            <img src={Illluvinm} alt="iIlluvium" />
            <img src={BigImg} alt="big-time2" />
            <img src={DefiImg} alt="defi-kingdoms" />
            <img src={AuroryImg} alt="aurory" />
            <img src={AxieImg} alt="axie" />
            <img src={ThetanImg} alt="thetan-arena" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerSection;
