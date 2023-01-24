import './AfterTransactionModal.scss';

import { useContext } from 'react';
import Modal from '../../../components/Modal';
import { UserContext } from '../../../contexts/UserContext';
import IconSuccess from '../../../assets/img/approve-success.svg';
import IconTwitter from '../../../assets/img/twitter-white.svg';
import MetamaskImg from '../../../assets/img/metamask.png';
import { useAddTokenToMetamask } from '../../../hooks/useAddTokenToMetamask';

const AfterTransactionModal = () => {
  const { isTransactionModalOpened, setIsTransactionModalOpened } =
    useContext(UserContext);
  const addTokenToMetamask = useAddTokenToMetamask('xJOY');

  return (
    <Modal
      isOpen={isTransactionModalOpened}
      onRequestClose={() => setIsTransactionModalOpened(false)}
      style={{
        overlay: {
          background: 'rgba(6, 14, 33, 0.72)',
        },
        content: {
          maxWidth: '803px',
          width: '100%',
          padding: '16px',
        },
      }}
    >
      <div className="approve-popup">
        <button
          className="close-button"
          onClick={() => setIsTransactionModalOpened(false)}
        />
        <img src={IconSuccess} className="header-icon" alt="success" />
        <h3>Congratulations!</h3>
        <p>
          Thank you for your purchase into Joystick. We are excited to have
          you on board and hear your feedback within the community.
        </p>
        <p>
          Things will move very quickly, so be sure to follow us on Twitter to
          stay updated!
        </p>
        <p className="narrow-paragraph">
          Add the xJOY token to your wallet by clicking the button below.
        </p>
        <div className="button-wrapper">
          <a
            className="cta twitter-cta"
            href="https://twitter.com/joystickpros/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={IconTwitter} alt="twitter" />
            <span>Twitter</span>
          </a>

          <button className="cta metamask-cta" onClick={addTokenToMetamask}>
            <img src={MetamaskImg} alt="twitter" />
            <span>Add xJOY to MetaMask</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AfterTransactionModal;
