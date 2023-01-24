import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { INJECTED_CONNECTOR, WALLETCONNECT_CONNECTOR } from '../constants';
import { useIsMounted } from '.';
import * as Sentry from '@sentry/react';

const isAuthorized = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const isInjectedAuthorized = await INJECTED_CONNECTOR.isAuthorized();
    if (isInjectedAuthorized) {
      resolve(true);
      return;
    }

    // @ts-ignore
    if (!window.ethereum) {
      resolve(false);
      return;
    }

    try {
      // @ts-ignore
      return window.ethereum
        .request({ method: 'eth_accounts' })
        .then((response: any) => {
          resolve(Array.isArray(response) && (response as any[]).length > 0);
        });
    } catch {
      resolve(false);
    }
  });
};

export const useEagerConnect = () => {
  const isMounted = useIsMounted();
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    let walletLinkAddress: string | undefined = undefined;
    try {
      // @ts-ignore
      walletLinkAddress = walletLinkExtension.selectedAddress;
    } catch {}

    try {
      const walletConnectData = JSON.parse(
        localStorage.getItem('walletconnect') || ''
      );

      if (walletConnectData.connected) {
        Sentry.setContext('wallet', {
          connector: 'WalletConnect',
        });

        activate(WALLETCONNECT_CONNECTOR)
          .catch(() => {})
          .then(() => {
            if (isMounted.current) {
              setTried(true);
            }
          });
        return;
      }
    } catch {}

    isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized && isMounted.current && !walletLinkAddress) {
        Sentry.setContext('wallet', {
          connector: 'Injected',
        });
        activate(INJECTED_CONNECTOR, undefined, true).catch(() => {
          if (isMounted.current) {
            setTried(true);
          }
        });
      } else {
        if (isMounted.current) {
          setTried(true);
        }
      }
    });
  }, [activate, isMounted]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
