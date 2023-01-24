import { createContext, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PASSWORD } from '../constants';
import { trackingService } from '../services';
import {
  getLocalStorageIsTermsAccepted,
  getLocalStorageIsWhitelisted,
  setLocalStorageIsTermsAccepted,
  setLocalStorageIsWhitelisted,
} from '../utils/localstorage';

const emptyFunc = () => {};

type UserContextState = {
  isPresaleWhitelisted: boolean;
  isWalletConnectOpened: boolean;
  isTermsAccepted: boolean;
  isTransactionModalOpened: boolean;
  currencyAmount: string;
  setIsPresaleWhitelisted: (value: boolean) => void;
  setIsWalletConnectOpened: (value: boolean) => void;
  setIsTermsAccepted: (value: boolean) => void;
  setIsTransactionModalOpened: (value: boolean) => void;
  setCurrencyAmount: (value: string) => void;
};

export const UserContext = createContext<UserContextState>({
  isPresaleWhitelisted: false,
  setIsPresaleWhitelisted: emptyFunc,
  isWalletConnectOpened: false,
  setIsWalletConnectOpened: emptyFunc,
  isTermsAccepted: false,
  setIsTermsAccepted: emptyFunc,
  isTransactionModalOpened: false,
  setIsTransactionModalOpened: emptyFunc,
  currencyAmount: '',
  setCurrencyAmount: emptyFunc,
});

export const UserContextProvider: FC = ({ children }) => {
  const [isWalletConnectOpened, setIsWalletConnectOpened] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(
    getLocalStorageIsTermsAccepted()
  );
  const [isPresaleWhitelisted, setIsPresaleWhitelisted] = useState(
    getLocalStorageIsWhitelisted()
  );
  const [isTransactionModalOpened, setIsTransactionModalOpened] =
    useState(false);
  const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pswParam = searchParams.get('psw');

    if (pswParam) {
      if (pswParam.toLowerCase() === DEFAULT_PASSWORD.toLowerCase()) {
        setIsPresaleWhitelisted(true);
      } else {
        trackingService
          .checkPassword(pswParam.toLowerCase())
          .then((checkResult) => {
            if (checkResult?.result) {
              setIsPresaleWhitelisted(true);
              setLocalStorageIsWhitelisted(true);
            }
          })
          .catch(() => {});
      }
    }
  }, [searchParams]);

  return (
    <UserContext.Provider
      value={{
        isPresaleWhitelisted,
        isWalletConnectOpened,
        isTermsAccepted,
        isTransactionModalOpened,
        currencyAmount,
        setIsPresaleWhitelisted: (value) => {
          setLocalStorageIsWhitelisted(value);
          setIsPresaleWhitelisted(value);
        },
        setIsWalletConnectOpened,
        setIsTermsAccepted: (value) => {
          setIsTermsAccepted(value);
          setLocalStorageIsTermsAccepted(value);
        },
        setIsTransactionModalOpened,
        setCurrencyAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
