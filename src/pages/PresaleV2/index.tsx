import './Presale.scss';

import { useContext } from 'react';
import Header from '../../components/PresaleHeader';
import ConnectModal from '../../components/ConnectModal';
import PresalePanel from './components/PresalePanel';
import { UserContext } from '../../contexts/UserContext';
import { useEagerConnect, useWeb3Listener } from '../../hooks';

const Presale = () => {
  useEagerConnect();
  useWeb3Listener();

  const { isWalletConnectOpened, setIsWalletConnectOpened } =
    useContext(UserContext);

  return (
    <div className="presaleV2-page">
      <div className="presaleV2-page-wrapper">
        <Header />
        <PresalePanel />
        <ConnectModal
          isOpened={isWalletConnectOpened}
          onClose={() => setIsWalletConnectOpened(false)}
        />
      </div>
    </div>
  );
};

export default Presale;
