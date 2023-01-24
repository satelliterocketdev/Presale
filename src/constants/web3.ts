import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const IS_LOCAL = false; // window.location.hostname === 'localhost';

const TESTNET_CHAINID = 4;
const TESTNET_RPC =
  'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const TESTNET_NAME = 'Rinkeby Test Network';

const MAINNET_CHAINID = 1;
const MAINNET_RPC =
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const MAINNET_NAME = 'Ethereum Network';

export const NETWORK_CHAINID = IS_LOCAL ? TESTNET_CHAINID : MAINNET_CHAINID;
export const NETWORK_RPC = IS_LOCAL ? TESTNET_RPC : MAINNET_RPC;
export const NETWORK_NAME = IS_LOCAL ? TESTNET_NAME : MAINNET_NAME;

export const SUPPORTED_CHAINIDS = [NETWORK_CHAINID];

export const INJECTED_CONNECTOR = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINIDS,
});

export const WALLETCONNECT_CONNECTOR = new WalletConnectConnector({
  bridge: 'https://bridge.walletconnect.org',
  chainId: NETWORK_CHAINID,
  clientMeta: {
    description: 'Algorithmic Liquidity Market Protocol on Avalanche',
    icons: ['https://app.benqi.fi/svgs/qi_black_text.svg'],
    name: 'BENQI',
    url: 'https://app.benqi.fi',
  },
  rpc: {
    [NETWORK_CHAINID]: NETWORK_RPC,
  },
  supportedChainIds: [NETWORK_CHAINID],
});

export type Connector = 'Injected' | 'WalletConnect';
