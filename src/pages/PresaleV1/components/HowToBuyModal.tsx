import {
  CloseIconRounded,
} from '../../../components/icons';
import Modal from '../../../components/Modal';

import Styles from './HowToBuyModal.module.scss';
import React from 'react';

type HowToBuyModalProps = {
  isVisibleHowToModal: boolean;
  setVisibleHowToModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const HowToBuyModal: React.FC<HowToBuyModalProps> = (props) => {
  return (
    <>
      <Modal
        isOpen={props.isVisibleHowToModal}
        onRequestClose={() => {
          props.setVisibleHowToModal(false)
        }}
        style={{
          overlay: {
            background: 'rgba(6, 14, 33, 0.72)',
          },
          content: {
            maxWidth: '410px',
            width: '100%',
            background: '#fff',
            borderRadius: '16px',
          },
        }}
      >
        <div className={Styles.prohibitionPopUp}>
          <CloseIconRounded
            className={Styles.closeIcon}
            onClick={() => {
              props.setVisibleHowToModal(false)
            }}
          />
          <div className={Styles.text}>
            <p className={Styles.textTitle}>
              How To Buy $JOY
            </p>
            <ol className={Styles.textDescription}>
              <li>Click on the “Connect Wallet” button found in the top of the page</li>
              <li>Select between Metamask Wallet or WalletConnect</li>
              <li>Click on the “Connect” button</li>
              <li>Make sure you are connected to the Ethereum Network</li>
              <li>Enter in the desired amount of USDC or USDT you would like to use to purchase $JOY</li>
              <li>Click on the green “Approve” button</li>
              <li>Select the wallet/account which contains the funds to complete the purchase</li>
              <li>Approve the transaction</li>
              <li>Receive $xJOY in your wallet</li>
              <li>Celebrate that you got in on the ground floor with Joystick!</li>
            </ol>
            <p className={Styles.textComment}>
              *Please note that $xJOY tokens will be locked to the wallet address they were purchased from until $JOY tokens are claimed.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HowToBuyModal;
