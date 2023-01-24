import './PresalePanel.scss';

import { useContext, useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import ReactTooltip from 'react-tooltip';

import RefreshSvg from '../../../assets/svg/refresh.svg';
import IDAOTitleImg from '../../../assets/img/IDO-title.png';
import TopBorderImg from '../../../assets/img/presale-border-top.png';
import BottomBorderImg from '../../../assets/img/presale-border-bottom.png';
import VerticalBorderImg from '../../../assets/img/border-vertical-presale.png';
import CountdownSeparatorImg from '../../../assets/img/presale-countdown-separator.png';
import QuestionImg from '../../../assets/img/presale-question.png';
import TokenImg from '../../../assets/img/presale-token.png';
import UsdcImg from '../../../assets/img/usdc.svg';
import { UserContext } from '../../../contexts/UserContext';
import {
  useERC20Approve,
  useERC20Balance,
  usePresaleDeposit,
  usePresaleInfo,
  useWeb3Provider,
} from '../../../hooks';
import CurrencyInput from '../../../components/CurrencyInput';
import ActionButton from '../../../components/ActionButton';
import Loader from '../../../components/Loader';
import { Asset } from '../../../constants/contracts';

const PresalePanel = () => {
  const { setIsWalletConnectOpened } = useContext(UserContext);

  const [asset, setAsset] = useState<Asset>('USDC');
  const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const { active } = useWeb3Provider();
  const [assetBalance, refreshAssetBalance] = useERC20Balance(asset);
  const presaleInfo = usePresaleInfo();
  const { isApproved, isApproving, approve } = useERC20Approve(asset);
  const { isDepositing, deposit } = usePresaleDeposit();

  const isPresaleLive = useMemo<boolean>(
    () =>
    !presaleInfo.isSale,
    [presaleInfo.isSale]
  );

  const ctaBtn = useMemo(() => {
    const btnContent = active ? (
      isPresaleLive ? (
        isApproved ? (
          isDepositing ? (
            <>
              <Loader />
              Depositing
            </>
          ) : (
            'Deposit'
          )
        ) : isApproving ? (
          <>
            <Loader />
            Waiting Approval
          </>
        ) : (
          'Approve'
        )
      ) : (
        'Sale Not Started'
      )
    ) : (
      'Connect Wallet'
    );

    return (
      <ActionButton
        disabled={active && (!currencyAmount || !isPresaleLive)}
        onClick={() => {
          if (active) {
            if (isApproved) {
              if (!isDepositing) {
                // deposit(parseFloat(currencyAmount), asset);
              }
            } else if (!isApproving) {
              approve();
            }
          } else {
            setIsWalletConnectOpened(true);
          }
        }}
      >
        {btnContent}
      </ActionButton>
    );
  }, [
    active,
    approve,
    asset,
    currencyAmount,
    deposit,
    isApproved,
    isApproving,
    isDepositing,
    isPresaleLive,
    setIsWalletConnectOpened,
  ]);

  return (
    <div className="presaleV2-panel">
      <img className="presaleV2-heading-img" src={IDAOTitleImg} alt="" />

      <div className="presaleV2-panel-wrapper">
        <img
          className="presaleV2-horizontal-border presaleV2-top-border"
          src={TopBorderImg}
          alt=""
        />
        <img
          className="presaleV2-horizontal-border presaleV2-bottom-border"
          src={BottomBorderImg}
          alt=""
        />
        <img
          className="presaleV2-vertical-border presaleV2-left-border"
          src={VerticalBorderImg}
          alt=""
        />
        <img
          className="presaleV2-vertical-border presaleV2-right-border"
          src={VerticalBorderImg}
          alt=""
        />

        <div className="presaleV2-sale-status">SALE PERIOD</div>

        <div className="presaleV2-pannel-inner">
          <h1 className="presaleV2-ido">Joystick IDO</h1>

          <div className="presaleV2-currency-select-row">
            <div className="presaleV2-currency-select-title">
              I want to deposit
            </div>

            <div className="presaleV2-currency-select-list">
              <button
                onClick={() =>
                  assetBalance &&
                  setCurrencyAmount((assetBalance / 4).toString())
                }
              >
                25%
              </button>
              <button
                onClick={() =>
                  assetBalance &&
                  setCurrencyAmount((assetBalance / 2).toString())
                }
              >
                50%
              </button>
              <button
                onClick={() =>
                  assetBalance &&
                  setCurrencyAmount((assetBalance * 0.75).toString())
                }
              >
                75%
              </button>
              <button
                onClick={() =>
                  assetBalance && setCurrencyAmount(assetBalance.toString())
                }
              >
                100%
              </button>
            </div>
          </div>

          <CurrencyInput
            value={currencyAmount}
            onChange={setCurrencyAmount}
            maxValue={assetBalance}
            selectedAsset={asset}
            onAssetChange={setAsset}
          />

          <div className="presaleV2-cta-row">
            <div>{ctaBtn}</div>
            <div className="presaleV2-usdc-balance">
              <span>
                Balance:{' '}
                {assetBalance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? '--'}
              </span>
              <button onClick={refreshAssetBalance}>
                <img src={RefreshSvg} alt="" />
              </button>
            </div>
          </div>

          <div className="presaleV2-info-grid">
            {!isPresaleLive ? null : (
              <div className="presaleV2-info-board">
                <div className="presaleV2-info-title">
                  Sale Period Ends{' '}
                  <img
                    data-tip
                    data-for="sale-end-countdown"
                    src={QuestionImg}
                    alt=""
                  />
                </div>
              </div>
            )}

            <div className="presaleV2-info-board">
              <div className="presaleV2-info-title">Tokens Sold</div>
              <div className="presaleV2-info-value">
                <div className="presaleV2-tokens-sold">
                  {/* <div>
                    {typeof presaleInfo.joysSoldPercentage === 'undefined'
                      ? 'N/A'
                      : `${presaleInfo.joysSoldPercentage}%`}
                  </div>
                  <div className="presaleV2-tokens-left">
                    ({presaleInfo.joysRemaining?.toLocaleString() ?? '0'} Left)
                  </div> */}
                </div>
              </div>
            </div>

            <div className="presaleV2-info-board">
              <div className="presaleV2-info-title">USDC Contributed</div>
              <div className="presaleV2-info-value presaleV2-info-currency">
                <img src={UsdcImg} alt="" />
              </div>
            </div>

            <div className="presaleV2-info-board">
              <div className="presaleV2-info-title">Token Price</div>
              <div className="presaleV2-info-value presaleV2-info-currency">
                <img src={TokenImg} alt="" />
              </div>
            </div>

            <div
              className={`presaleV2-info-board ${
                !isPresaleLive ? 'presaleV2-info-board-half-width' : ''
              }`}
            >
              <div className="presaleV2-info-title">$Joy For Sale</div>
            </div>
          </div>
        </div>
      </div>

      <div className="presaleV2-instruction">
        <button className="presaleV2-instruction-cta">Click Here</button> for
        instructions on how to purchase the $JOY/$xJOY Token
      </div>
      <ReactTooltip id="sale-end-countdown" type="success" effect="solid">
        <p className="presaleV2-tooltip">
          Invest into Joystick at our IDO price before it hits the public! Our
          sale period ends soon
        </p>
      </ReactTooltip>
    </div>
  );
};

export default PresalePanel;
