import { useCallback, useEffect, useState } from 'react';
import { formatUnits } from 'ethers/lib/utils';

import { Asset, ASSET_LIST } from '../constants/contracts';

import { useContract } from './useContract';
import { useWeb3Provider } from './useWeb3Provider';
import { useIsMounted } from './useIsMounted';
import { BigNumber } from 'ethers';

export const useERC20Balance = (
  asset: Asset
): [number | undefined, () => void] => {
  const erc20Contract = useContract(
    ASSET_LIST[asset].address,
    ASSET_LIST[asset].abi,
    true
  );
  const { account } = useWeb3Provider();
  const [balance, setBalance] = useState<number>();
  const isMounted = useIsMounted();

  const fetchERC20Balance = useCallback(() => {
    if (account && erc20Contract) {
      erc20Contract
        .balanceOf(account)
        .then((value: BigNumber) => {
          if (isMounted.current) {
            const usdcAmount = parseFloat(
              formatUnits(value.toString(), ASSET_LIST[asset].decimals)
            );
            setBalance(usdcAmount);
          }
        })
        .catch((error: any) => {
          if (isMounted.current) {
            console.error(error);
            setBalance(undefined);
          }
        });
    }
  }, [account, erc20Contract, isMounted, asset]);

  useEffect(() => {
    fetchERC20Balance();

    const interval = setInterval(() => {
      fetchERC20Balance();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchERC20Balance]);

  return [balance, fetchERC20Balance];
};
