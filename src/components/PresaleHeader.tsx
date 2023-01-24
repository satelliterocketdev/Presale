import './PresaleHeader.scss';

import { useContext, useState } from 'react';

import imgLogo from '../assets/img/logo-light.png';
import HeaderLogo from '../assets/img/presale-banner-logo.png';
import IDAOPrivateTitleImg from '../assets/img/OTC-Desk.png';
import ChevronDownImg from '../assets/img/chevron-down.svg';
import { UserContext } from '../contexts/UserContext';
import { useWeb3Provider } from '../hooks';
import { getWalletAddressAbbr } from '../utils';

const Header = ({test}: {test?: boolean}) => {
  const { isWalletConnectOpened, setIsWalletConnectOpened } =
    useContext(UserContext);
  const { account, active, deactivate } = useWeb3Provider();
  const [isWalletInfoOpened, setIsWalletInfoOpened] = useState(false);

  return (
    <div className="presale-header">
      <img className="presale-header-bg" src={HeaderLogo} alt="" />
      <div className="presale-header-container">
        <img className="presale-logo" src={imgLogo} alt="logo header" style={{ width: 163, height: 18 }} />
        {/* <img className="presale-title" src={IDAOPrivateTitleImg} alt="title header" /> */}
        <button
          className="presale-wallet-btn"
          onClick={() => {
            if (active) {
              setIsWalletInfoOpened(!isWalletInfoOpened);
            } else {
              !isWalletConnectOpened
                ? setIsWalletConnectOpened(true)
                : setIsWalletConnectOpened(false);
            }
          }}
        >
          {active ? (
            <>
              <span>{getWalletAddressAbbr(account)}</span>
              <img src={ChevronDownImg} alt="" />
            </>
          ) : (
            'Connect Wallet'
          )}
        </button>

        {active && isWalletInfoOpened ? (
          <button
            className="wallet-info-button"
            onClick={() => {
              deactivate();
              setIsWalletInfoOpened(false);
            }}
          >
            Disconnect
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Header;
