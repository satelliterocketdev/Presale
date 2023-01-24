import { Web3Provider } from '@ethersproject/providers';
import { NetworkConnector } from '../connectors';

export const getWalletAddressAbbr = (address?: string | null) => {
  return address
    ? `${address.slice(0, 7)}...${address.slice(address.length - 5)}`
    : '';
};

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(network: NetworkConnector): Web3Provider {
  return (networkLibrary =
    networkLibrary ?? new Web3Provider(network.provider as any));
}
