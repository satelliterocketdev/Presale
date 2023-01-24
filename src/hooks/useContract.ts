import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { useWeb3Provider } from './useWeb3Provider';
import { useNetworkConnector } from './useNetworkConnector';
import { getNetworkLibrary } from '../utils';

export const useContract = (
  address?: string,
  abi?: any,
  withSigner?: boolean
) => {
  const { library, account } = useWeb3Provider();
  const network = useNetworkConnector();

  return useMemo(() => {
    const networkLibrary = getNetworkLibrary(network);
    return address
      ? new Contract(
          address,
          abi,
          withSigner && account
            ? library?.getSigner(account)
            : networkLibrary
            ? networkLibrary
            : library
        )
      : null;
  }, [abi, account, address, library, network, withSigner]);
};
