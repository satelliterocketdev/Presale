import './DepositConfirmModal.scss';

import Modal from '../../../components/Modal';
import IconSuccess from '../../../assets/img/approve-success.svg';
import React from 'react';

type DepositConfirmModalProps = {
  isVisibleDepositConfirmModal: boolean;
  setVisibleDepositConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepositConfirmModal: React.FC<DepositConfirmModalProps> = (props) => {
  return (
    <>
    <Modal
      isOpen={props.isVisibleDepositConfirmModal}
      onRequestClose={() => props.setVisibleDepositConfirmModal(false)}
      style={{
        overlay: {
          background: 'rgba(6, 14, 33, 0.72)',
        },
        content: {
          maxWidth: '450px',
          width: '100%',
          padding: '12px',
        },
      }}
    >
      <div className="approve-popup">
        <button
          className="close-button"
          onClick={() => props.setVisibleDepositConfirmModal(false)}
        />
        <img src={IconSuccess} className="header-icon" alt="success" />
        <h3>Approval Successful</h3>
        <p>
          Enter the USD amount you would like and click the "Deposit" button to complete your purchase.
        </p>
        <div className="button-wrapper">
          <button
            className="cta close-cta"
            onClick={() => props.setVisibleDepositConfirmModal(false)}
          >
            <span>Ok</span>
          </button>

          {/* <button className="cta metamask-cta" onClick={addTokenToMetamask}>
            <img src={MetamaskImg} alt="twitter" />
            <span>Add xJOY to MetaMask</span>
          </button> */}
        </div>
      </div>
    </Modal>
    </>
  );
};

export default DepositConfirmModal;
