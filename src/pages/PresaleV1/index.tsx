import './Presale.scss';

import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/PresaleHeader';

import ConnectModal from '../../components/ConnectModal';
import PresalePanel from './components/PresalePanel';
import { UserContext } from '../../contexts/UserContext';
import { useEagerConnect, useWeb3Listener } from '../../hooks';
import AfterTransactionModal from './components/AfterTransactionModal';
import { SALE_TYPE } from '../../constants';
import ClaimingPanel from './components/ClaimingPanel';

const Presale = ({test}: {test?: boolean}) => {
  useEagerConnect();
  useWeb3Listener();

  const { isWalletConnectOpened, setIsWalletConnectOpened } =
    useContext(UserContext);

  return (
    <div className="presale-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {SALE_TYPE === '0' ? 'Seed Round' : 'OTC Desk'} | Joystick
        </title>
        <meta property="og:url" content="https://seed.joystickgames.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="OTC Desk | Joystick" />
        <meta property="og:site_name" content="Joystick" />
        <meta
          property="og:description"
          content="OTC Desk for Joystick. If you know, you know."
        />
        <meta
          property="og:image"
          content="https://joystickgames.com/img/logo.png"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-86LG0YJZ03"
        ></script>
        <script>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-86LG0YJZ03');
            `}
        </script>
      </Helmet>

      <div className="presale-page-wrapper">
        <Header test={test} />
        {/* <PresalePanel /> */}
        <ClaimingPanel />
        <ConnectModal
          isOpened={isWalletConnectOpened}
          onClose={() => setIsWalletConnectOpened(false)}
        />

        <AfterTransactionModal />
      </div>
    </div>
  );
};

export default Presale;
