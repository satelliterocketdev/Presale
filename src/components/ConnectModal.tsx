import './ConnectModal.scss';

import Modal from './Modal';
import CloseIcon from '../assets/img/close.png';
import MetamaskImg from '../assets/img/metamask.png';
import WalletConnectImg from '../assets/img/wallet-connect.png';
import { useWeb3Provider } from '../hooks';

const ConnectModal = ({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const { activate } = useWeb3Provider();

  return (
    <Modal isOpen={isOpened} onRequestClose={onClose}>
      <div className="wallet-connect-modal">
        <button className="wallet-connect-close">
          <img
            src={CloseIcon}
            alt=""
            onClick={onClose}
            width="100%"
            height="100%"
          />
        </button>

        <div className="wallet-connect-inner">
          <button
            className="wallet-connector-button"
            onClick={() => activate('Injected')}
          >
            <img src={MetamaskImg} alt="" />
            MetaMask
          </button>
          <button
            className="wallet-connector-button"
            onClick={() => activate('WalletConnect')}
          >
            <img src={WalletConnectImg} alt="" />
            WalletConnect
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ConnectModal;
