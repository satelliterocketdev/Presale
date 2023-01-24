import {
  JOY_DECIMALS,
  PRESALER_ADDRESS,
  xJOY_ADDRESS,
  USDC_DECIMALS,
} from '../constants/contracts';
import PresaleABI from '../constants/ABI/presaler.json';
import xJoyABI from '../constants/ABI/xjoy.json';
import { useContract } from './useContract';
import { useCallback, useEffect, useState } from 'react';
import { formatUnits } from 'ethers/lib/utils';
import { useIsMounted } from './useIsMounted';
import { SALE_TYPE } from '../constants'

export const usePresaleInfo = () => {
  const presaleContract = useContract(PRESALER_ADDRESS, PresaleABI);
  const xJoyContract = useContract(xJOY_ADDRESS, xJoyABI);
  const isMounted = useIsMounted();

  const [presaleInfo, setPresaleInfo] = useState<{
    isSale?: boolean,
    xJoysRemained?: number;
  }>({});

  const fetchPresaleInfo = useCallback(() => {
    if (presaleContract && xJoyContract) {
      Promise.all([
        presaleContract.sale(),
        xJoyContract.balanceOf(PRESALER_ADDRESS),
      ])
        .then(
          ([isSale, xJoysRemainedBN]) => {
            if (isMounted.current) {
              const xJoysRemained = parseFloat(
                formatUnits(xJoysRemainedBN.toString(), JOY_DECIMALS)
              );
              setPresaleInfo({
                isSale,
                xJoysRemained,
              });
            }
          }
        )
        .catch((err) => {
          console.log('--------------error')
          if (isMounted.current) {
            console.error(err);
            setPresaleInfo({});
          }
        });
    }
  }, [isMounted, presaleContract, xJoyContract]);

  useEffect(() => {
    fetchPresaleInfo();
    const timer = setInterval(() => fetchPresaleInfo(), 3000);
    return () => {
      clearInterval(timer);
    };
  }, [fetchPresaleInfo]);

  return presaleInfo;
};
