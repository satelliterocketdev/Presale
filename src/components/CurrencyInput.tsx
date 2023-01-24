import { useState } from 'react';

import './CurrencyInput.scss';

import NumberFormat from 'react-number-format';

import UsdcImg from '../assets/img/usdc.svg';
import UsdtImg from '../assets/img/usdt.svg';
import CarrotIcon from '../assets/img/carrot.svg';
import CheckMarkIcon from '../assets/img/check-mark.svg';
import { Asset } from '../constants/contracts';

const coins: { [key in Asset]?: { icon: string } } = {
  USDC: {
    icon: UsdcImg,
  },
  USDT: {
    icon: UsdtImg,
  },
};

const CurrencyInput = ({
  value,
  maxValue,
  onChange,
  selectedAsset,
  onAssetChange,
}: {
  value: string;
  selectedAsset: Asset;
  maxValue?: number;
  onChange: (value: string) => void;
  onAssetChange: (asset: Asset) => void;
}) => {
  const [visibleSelector, setVisibleSelector] = useState(false);

  const selectCoin = (coin: Asset) => {
    if (coin) {
      onAssetChange(coin);
      setVisibleSelector(false);
    }
  };

  return (
    <div className="presale-currency-input">
      <NumberFormat
        value={value}
        thousandSeparator={true}
        isNumericString
        allowNegative={false}
        fixedDecimalScale
        isAllowed={({ floatValue }) =>
          floatValue && maxValue ? floatValue <= maxValue : true
        }
        placeholder="0.00"
        onValueChange={({ value }) => onChange(value)}
      />
      <div
        className="presale-currency-input-symbol"
        onClick={() => setVisibleSelector(true)}
      >
        <img
          src={coins[selectedAsset]?.icon}
          className="coin-image"
          alt={selectedAsset}
        />
        <span>{selectedAsset}</span>
        <img src={CarrotIcon} className="carrot-icon" alt="Carrot" />
      </div>
      {visibleSelector ? (
        <>
          <div
            className="coin-selector-backdrop"
            onClick={() => setVisibleSelector(false)}
          />
          <div className="coin-selector">
            {Object.keys(coins).map((asset) => (
              <div
                key={asset}
                className={`coin-selector-item ${
                  asset === selectedAsset ? 'selected' : ''
                }`}
                onClick={() => selectCoin(asset as Asset)}
              >
                <img
                  src={coins[asset as Asset]?.icon}
                  className="coin-image"
                  alt={asset}
                />
                <span>{asset}</span>
                <img
                  src={CheckMarkIcon}
                  className="check-mark"
                  alt="check mark"
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CurrencyInput;
