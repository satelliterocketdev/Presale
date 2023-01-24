import { useMemo } from 'react';
import { NetworkConnector } from '../connectors';
import { NETWORK_CHAINID, NETWORK_RPC } from '../constants';

export const useNetworkConnector = () => {
  const network = useMemo(
    () =>
      new NetworkConnector({
        urls: {
          [NETWORK_CHAINID]: NETWORK_RPC,
        },
      }),
    []
  );

  return network;
};
