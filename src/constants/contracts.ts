import USDCABI from './ABI/usdc.json';
import USDTABI from './ABI/usdt.json';
import xJOYABI from './ABI/xjoy.json';

export const USDC_ADDRESS = process.env.REACT_APP_USDC_ADDRESS || "";
export const USDT_ADDRESS = process.env.REACT_APP_USDT_ADDRESS || "";
export const xJOY_ADDRESS = process.env.REACT_APP_xJOY_ADDRESS || "";
export const JOY_ADDRESS = process.env.REACT_APP_JOY_ADDRESS || "";
export const PRESALER_ADDRESS = process.env.REACT_APP_PRESALER_ADDRESS || "";

export const USDC_DECIMALS = 6;
export const USDT_DECIMALS = 6;
export const JOY_DECIMALS = 18;

export type Asset = 'USDC' | 'USDT' | 'xJOY';

export const ASSET_LIST: {
  [key in Asset]: {
    address: string;
    abi: any;
    decimals: number;
  };
} = {
  USDC: {
    address: USDC_ADDRESS,
    decimals: USDC_DECIMALS,
    abi: USDCABI,
  },
  USDT: {
    address: USDT_ADDRESS,
    decimals: USDT_DECIMALS,
    abi: USDTABI,
  },
  xJOY: {
    address: xJOY_ADDRESS,
    decimals: JOY_DECIMALS,
    abi: xJOYABI,
  },
};
