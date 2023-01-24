import './Footer.scss';

import React, { useState } from 'react';
import imgLogo from '../../../assets/img/logo-light.png';
import SocialMedia from '../../../components/common/SocialMedia';
import TermsOfUse from '../../PresaleV1/components/TermsOfUse';
import PrivacyPolicy from '../../PresaleV1/components/PrivacyPolicy';

const Footer = ({test}: {test?: boolean}) => {
  const [displayTAC, setDisplayTAC] = useState<boolean>(false);
  const [displayPrivacy, setDisplayPrivacy] = useState<boolean>(false);

  return (
    <div className="home-footer">
      {displayTAC && (
        <div className='modal-overlay' onClick={() => setDisplayTAC(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDisplayTAC(false)}>&times;</button>
            <TermsOfUse />
          </div>
        </div>
      )}
      {displayPrivacy && (
        <div className='modal-overlay' onClick={() => setDisplayPrivacy(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDisplayPrivacy(false)}>&times;</button>
            <PrivacyPolicy />
          </div>
        </div>
      )}
      <div className="inner">
        <div>
          <img src={imgLogo} alt="logo" style={{ width: 217, height: 24 }} />
          <div className="desc-txt">
            Copyright {new Date().getFullYear() - 1} -{' '}
            {new Date().getFullYear()} &copy;
          </div>
        </div>
        <div>
          <SocialMedia />
          <div className="terms-txt" style={{ display: 'flex' }}>
            <button className="terms-txt" onClick={() => setDisplayTAC(true)}>
              Terms of Use
            </button>
            &nbsp;|&nbsp;
            <button className="terms-txt" onClick={() => setDisplayPrivacy(true)}>
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
