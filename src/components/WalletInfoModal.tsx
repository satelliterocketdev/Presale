import './WalletInfoModal.scss';

import Modal from './Modal';
import CloseIcon from '../assets/img/close.png';
import { useWeb3Provider } from '../hooks';

const WalletInfoModal = ({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const { deactivate } = useWeb3Provider();

  return (
    <Modal isOpen={isOpened} onRequestClose={onClose}>
      <div className="wallet-info-modal">
        <button className="wallet-info-close">
          <img
            src={CloseIcon}
            alt=""
            onClick={onClose}
            width="100%"
            height="100%"
          />
        </button>

        <div className="wallet-info-inner">
          <button
            className="wallet-info-button"
            onClick={() => {
              deactivate();
              onClose();
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default WalletInfoModal;
