import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

import { INJECTED_CONNECTOR } from '../constants';

export const useWeb3Listener = (suppress: boolean = false) => {
  const { activate, active, error } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;

    let walletLinkAddress: string | undefined = undefined;
    try {
      // @ts-ignore
      walletLinkAddress = walletLinkExtension.selectedAddress;
    } catch {}

    if (
      ethereum &&
      ethereum.on &&
      !active &&
      (!error || error instanceof UnsupportedChainIdError) &&
      !suppress &&
      !walletLinkAddress
    ) {
      const handleChainChanged = () => {
        window.location.reload();
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(INJECTED_CONNECTOR);
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};
