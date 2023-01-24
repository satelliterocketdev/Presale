import { useCallback, useContext, useState } from 'react';
import { parseEther } from 'ethers/lib/utils';

import { Asset, PRESALER_ADDRESS } from '../constants/contracts';
import PresaleABI from '../constants/ABI/presaler.json';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { triggerToast } from '../utils';
import { UserContext } from '../contexts/UserContext';
import * as Sentry from '@sentry/react';
import { useWeb3Provider, usePresaleInfo } from '../hooks';
import { trackingService, otcSignatureService } from '../services';
import { DEFAULT_PASSWORD } from '../constants';

export const usePresaleDeposit = () => {
  const presaleContract = useContract(PRESALER_ADDRESS, PresaleABI, true);
  const [isDepositing, setIsDepositing] = useState(false);
  const isMounted = useIsMounted();
  const { setIsTransactionModalOpened, setCurrencyAmount } =
    useContext(UserContext);
  const { account } = useWeb3Provider();
  const presaleInfo = usePresaleInfo();

  const deposit = useCallback(
    (marketPrice: number, amount: number, asset: Asset) => {
      if (presaleContract) {
        setIsDepositing(true);
        Promise.all([otcSignatureService.makeSignature(account || '')])
        .then(([signature]) => {
        const tokenAmount = amount / (marketPrice * 0.45);
        presaleContract
          .deposits(parseEther(tokenAmount.toString()), parseEther(amount.toString()), asset === 'USDC' ? '0' : '1',
          5, signature
          )
          .then((txPreHash: any) => txPreHash.wait())
          .then(async (txHash: any) => {
            if (isMounted.current) {
              Sentry.captureMessage(txHash.transactionHash, {
                tags: {
                  section: 'deposit',
                },
              });
              const password =
                localStorage.getItem('joystickdao.password') ||
                DEFAULT_PASSWORD;

              triggerToast('SUCCESS');
              setIsTransactionModalOpened(true);
              setCurrencyAmount('');

              (window as any).gtag('set', { currency: 'USD' });
              (window as any).gtag('event', 'purchase', {
                value: amount,
                label: asset,
              });

              try {
                trackingService.createTracking(
                  password || '',
                  account || '',
                  txHash.transactionHash,
                  amount,
                  tokenAmount
                );
              } catch (e) {}
            }
          })
          .catch((err: any) => {
            console.error(err);
            Sentry.captureException(err, {
              tags: {
                section: 'deposit',
              },
            });
            triggerToast('ERROR');
          })
          .then(() => {
            if (isMounted.current) {
              setIsDepositing(false);
            }
          });
        }
        )
      }
    },
    [
      presaleContract,
      isMounted,
      account,
      setIsTransactionModalOpened,
      setCurrencyAmount,
    ]
  );

  return {
    isDepositing,
    deposit,
  };
};
