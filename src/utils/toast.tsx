import { toast } from 'react-toastify';

import SuccessIcon from '../assets/img/tx-success.png';
import ErrorIcon from '../assets/img/tx-error.png';
import WalletIcon from '../assets/img/tx-wallet.png';
import WalletDisconnectIcon from '../assets/img/tx-wallet-disconnect.png';
import WarningIcon from '../assets/svg/warning.svg';

export type TOAST_TYPE =
  | 'SUCCESS'
  | 'ERROR'
  | 'WRONG_NETWORK'
  | 'WALLET_CONNET'
  | 'WALLET_DISCONNECT'
  | 'LIMIT_EXCEED';

export const triggerToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'SUCCESS') {
    toast.success('Successful Transaction', {
      hideProgressBar: true,
      icon: () => <img src={SuccessIcon} alt="" />,
    });
  }

  if (type === 'WALLET_CONNET') {
    toast.success(
      <div>
        <p>Wallet Connected</p>
        <p className="Toastify__toast-submsg">
          Connected to wallet
          {extraContent ? (
            <>
              <br />
              {extraContent}
            </>
          ) : null}
        </p>
      </div>,
      {
        hideProgressBar: true,
        toastId: type,
        icon: () => <img src={WalletIcon} alt="" />,
      }
    );
  }

  if (type === 'WALLET_DISCONNECT') {
    toast.error(
      <div>
        <p>Wallet Disconnected</p>
        <p className="Toastify__toast-submsg">
          Disconnected from wallet
          {extraContent ? (
            <>
              <br />
              {extraContent}
            </>
          ) : null}
        </p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => <img src={WalletDisconnectIcon} alt="" />,
      }
    );
  }

  if (type === 'ERROR') {
    toast.error('Transaction Failed', {
      hideProgressBar: true,
      icon: () => <img src={ErrorIcon} alt="" />,
    });
  }

  if (type === 'WRONG_NETWORK') {
    toast.error(
      <div>
        <p>Wrong Network</p>
        <p className="Toastify__toast-submsg">Switch to Ethereum Network</p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => <img src={ErrorIcon} alt="" />,
      }
    );
  }

  if (type === 'LIMIT_EXCEED') {
    toast.error(
      <div>
        <p className="Toastify__toast-submsg">
          There are only ${extraContent} of tokens left for purchase in the
          private sale. Please change the amount to continue.
        </p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => (
          <div
            style={{
              width: 44,
              height: 44,
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              borderRadius: '100%',
            }}
          >
            <img src={WarningIcon} alt="" />
          </div>
        ),
      }
    );
  }
};

export const updateToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'WALLET_CONNET') {
    toast.update(type, {
      render: (
        <div>
          <p>Wallet Connected</p>
          <p className="Toastify__toast-submsg">
            Connected to wallet
            <br />
            {extraContent}
          </p>
        </div>
      ),
    });
  }
};
