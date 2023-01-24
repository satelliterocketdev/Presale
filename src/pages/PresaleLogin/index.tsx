import './PresaleLogin.scss';

import BotImage from '../../assets/img/login-header-bot.png';
import BorderTopImg from '../../assets/img/presale-pwd-border-top.png';
import BorderBottomImg from '../../assets/img/presale-pwd-border-bottom.png';
import BorderVerticalImg from '../../assets/img/presale-pwd-border-vertical.png';
import SeparatorImg from '../../assets/img/presale-pwd-separator.png';
import imgLogo from '../../assets/img/logo-light.png';
import { KeyboardEvent, useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { trackingService } from '../../services/tracking.service';
import { DEFAULT_PASSWORD } from '../../constants';
import { SALE_TYPE } from '../../constants';

const PresaleLogin = ({test}: {test?: boolean}) => {
  const [password, setPassword] = useState('');
  const { setIsPresaleWhitelisted } = useContext(UserContext);

  const onLogin = useCallback(async () => {
    let isCorrect = password.toLowerCase() === DEFAULT_PASSWORD;

    if (!isCorrect) {
      try {
        const checkResult = await trackingService.checkPassword(
          password.toLowerCase()
        );
        if (checkResult?.result) {
          isCorrect = true;
        }
      } catch (e) {}
    }

    if (isCorrect) {
      localStorage.setItem('joystickdao.password', password.toLowerCase());
      setIsPresaleWhitelisted(true);
    }
  }, [password, setIsPresaleWhitelisted]);

  useEffect(() => {
    if (SALE_TYPE === "2") {
      localStorage.setItem('joystickdao.password', DEFAULT_PASSWORD.toLowerCase());
      setIsPresaleWhitelisted(true);
    }
  }, [setIsPresaleWhitelisted]);

  const onSubmit = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onLogin();
      }
    },
    [onLogin]
  );

  return (
    <div className="presale-login-page">
      <div className="presale-login-header-wrapper">
        <img className="login-header-bot" src={BotImage} alt="" />
      </div>
      <div className="presale-login-panel">
        <img className="presale-login-border-top" src={BorderTopImg} alt="" />
        <img
          className="presale-login-border-bottom"
          src={BorderBottomImg}
          alt=""
        />
        <img
          className="presale-login-border-left"
          src={BorderVerticalImg}
          alt=""
        />
        <img
          className="presale-login-border-right"
          src={BorderVerticalImg}
          alt=""
        />

        <div className="presale-login-logo">
          <img src={imgLogo} alt="" />
        </div>

        <div className="presale-login-separator">
          <img src={SeparatorImg} alt="" />
        </div>

        <div className="presale-login-inner">
          {/* <h1 className="presale-login-title">{SALE_TYPE === '0' ? 'Seed Round' : 'Private'} Sale</h1> */}

          <input
            className="presale-login-pwd"
            type="password"
            placeholder="What's the secret password?"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={onSubmit}
          />

          <button onClick={onLogin} className="presale-login-btn">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresaleLogin;
