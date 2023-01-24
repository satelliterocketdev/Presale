import './PresalePanel.scss';

import { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';

import { useLocation } from 'react-router-dom';

import RefreshSvg from '../../../assets/svg/refresh.svg';
import IDAOPrivateTitleImg from '../../../assets/img/OTC-Desk_merged.png';
import IDAOSeedTitleImg from '../../../assets/img/seed-presale-header-bar.svg';
import TopBorderImg from '../../../assets/img/presale-border-top.png';
import BottomBorderImg from '../../../assets/img/presale-border-bottom.png';
import VerticalBorderImg from '../../../assets/img/border-vertical-presale.png';
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
import GlowBorderedCard from './GlowBorderedCard';
import HowToBuyModal from './HowToBuyModal';
import DepositConfirmModal from './DepositConfirmModal';
import { Asset } from '../../../constants/contracts';
import { getDiscountedPrice, getNormalizedPriceString, triggerToast } from '../../../utils';
import { SALE_TYPE } from '../../../constants';
import TermsAndConditions from './TermsAndConditions';
import DiscountForm, { DiscountSelectionContext } from '../../../components/DiscountForm';
import { DISCOUNT_LIST } from '../../../constants'
import { marketPriceService } from '../../../services';

// const percentages = [25, 50, 75, 100];

const PresalePanel = () => {
  const { currencyAmount, setIsWalletConnectOpened, setCurrencyAmount } = useContext(UserContext);
  const [selectedDicountFormIndex, setSelectedDicountFormIndex] = useState(0);
  const contextValue = { selectedDicountFormIndex, setSelectedDicountFormIndex };
  const [marketPrice, setMarketPrice] = useState(0.68);
  const { pathname } = useLocation();

  const [asset, setAsset] = useState<Asset>('USDC');
  const { active } = useWeb3Provider();
  const [assetBalance, refreshAssetBalance] = useERC20Balance(asset);
  const [xjoyBalance] = useERC20Balance('xJOY');
  const presaleInfo = usePresaleInfo();
  const { isApproved, isApproving, isProcessedApproving, approve } = useERC20Approve(asset);
  const [checkedTAC, setCheckedTAC] = useState<boolean>(false);
  const [displayTAC, setDisplayTAC] = useState<boolean>(false);
  const { isDepositing, deposit } = usePresaleDeposit();
  const [isVisibleHowToModal, setVisibleHowToModal] = useState<boolean>(false);
  const [isVisibleDepositConfirmModal, setVisibleDepositConfirmModal] = useState<boolean>(false);

  const saleType = parseInt(process.env.REACT_APP_SALE_TYPE ?? "");
  const isPrivateSale = true; // parseInt(process.env.REACT_APP_SALE_TYPE ?? "") === 2;
  // const [isPrivateSale, setPrivateSale] = useState<boolean>(false);
  // useEffect(() => {
  //   if (pathname && pathname.includes('hometest')) {
  //     setPrivateSale(true/* parseInt(process.env.REACT_APP_SALE_TYPE ?? "") === 2 */);
  //   }
  // }, [pathname]);

  const isPresaleLive = useMemo(
    () =>
    presaleInfo.isSale,
    [presaleInfo.isSale]
  );

  const isSoldOut = useMemo(
    () =>
    presaleInfo.xJoysRemained === 0,
    [presaleInfo.xJoysRemained]
  );

  useEffect(() => {
    if (isApproved && isProcessedApproving) {
      setVisibleDepositConfirmModal(true);
    }
  }, [isApproved, isProcessedApproving]);

  const fetchMarketPrice = useCallback(() => {
    marketPriceService.marketPrice().then((res) => {
      const price =  parseFloat(res.data['joystick-games']['usd']);
      setMarketPrice(price);
    }).catch((error) => {
      console.log(`error : ${JSON.stringify(error)}`);
      setMarketPrice((previousPrice) => (previousPrice));
    });
  }, []);

  useEffect(() => {
    fetchMarketPrice();
    const timer = setInterval(() => fetchMarketPrice(), 5000);
    return () => {
      clearInterval(timer);
    };
  }, [fetchMarketPrice]);

  const isShownDepositConfirmModal = useMemo<boolean>(
    () =>
      Boolean(
        isApproved && isVisibleDepositConfirmModal
      ),
    [isApproved, isVisibleDepositConfirmModal]
  );

  const ctaBtn = useMemo(() => {
    const btnContent = isSoldOut ? (
      'Sold Out'
    ) : active ? (
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
        'Sale Has Ended'
      )
    ) : (
      'Connect Wallet'
    );

    return (
      <ActionButton
        color={isSoldOut ? 'red' : undefined}
        disabled={
          isSoldOut ||
          (active && (!currencyAmount || !isPresaleLive) && isApproved)
        }
        onClick={() => {
          if (active) {
            if (isApproved) {
              if (!isDepositing) {
                const amount = parseFloat(currencyAmount);
                if (presaleInfo.xJoysRemained  === 0) {
                  triggerToast(
                    'LIMIT_EXCEED',
                    (
                      presaleInfo.xJoysRemained
                    ).toLocaleString()
                  );
                } else {
                  if (!isPrivateSale || checkedTAC) {
                    deposit(marketPrice, amount, asset);
                  }
                }
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
    isPrivateSale,
    checkedTAC,
    active,
    approve,
    asset,
    currencyAmount,
    deposit,
    isApproved,
    isApproving,
    isDepositing,
    isPresaleLive,
    isSoldOut,
    setIsWalletConnectOpened,
  ]);

  const onAssetChange = (newAsset: Asset) => {
    if (asset !== newAsset) {
      setAsset(newAsset);
      setCurrencyAmount('');
    }
  };

  return (
    <div className="presale-panel">
      {displayTAC && (
        <div className='modal-overlay' onClick={() => setDisplayTAC(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDisplayTAC(false)}>&times;</button>
            <TermsAndConditions />
          </div>
        </div>
      )}
      {/* <img
        className="presale-heading-img"
        src={SALE_TYPE === '0' ? IDAOSeedTitleImg : IDAOPrivateTitleImg}
        alt=""
      /> */}

      <div className="presale-panel-wrapper">
        <img
          className="presale-horizontal-border presale-top-border"
          src={TopBorderImg}
          alt=""
        />
        <img
          className="presale-horizontal-border presale-bottom-border"
          src={BottomBorderImg}
          alt=""
        />
        <img
          className="presale-vertical-border presale-left-border"
          src={VerticalBorderImg}
          alt=""
        />
        <img
          className="presale-vertical-border presale-right-border"
          src={VerticalBorderImg}
          alt=""
        />

        {/* <div className="presale-sale-status">
          <p>
            {SALE_TYPE === '0'
              ? 'Welcome to our private seed round'
              : 'Welcome to our discounted private sale'}
            !
          </p>
        </div> */}

        <div className="presale-pannel-inner">
          <div className="presale-cta">
            <button className="presale-cta-button default">Deposit</button>
            <button className="presale-cta-button">Withdraw</button>
          </div>

          <div className="presale-currency-select-row">
            <div className="presale-currency-select-title">
              I want to deposit
            </div>

            <div className="presale-usdc-balance">
              <button
                onClick={() =>
                  assetBalance && setCurrencyAmount(assetBalance.toString())
                }
              >
                Balance:{' '}
                {assetBalance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? '--'}
              </button>
              <button onClick={refreshAssetBalance}>
                <img src={RefreshSvg} alt="" />
              </button>
            </div>

            {/*
            <div className="presale-currency-select-list">
              {percentages.map((percentage) => (
                <button
                  onClick={() =>
                    assetBalance &&
                    setCurrencyAmount(
                      ((assetBalance * percentage) / 100).toString()
                    )
                  }
                >
                  {percentage}%
                </button>
              ))}
            </div>
            */}
          </div>
          <CurrencyInput
            value={currencyAmount}
            onChange={setCurrencyAmount}
            selectedAsset={asset}
            onAssetChange={onAssetChange}
            maxValue={assetBalance}
          />
          {/* <DiscountSelectionContext.Provider value={contextValue}>
            <div className="presale-discount-form-select">
              {DISCOUNT_LIST.map((discount, index) => (
                <DiscountForm discount={discount} index={index} key={index} />
              ))}
            </div>
          </DiscountSelectionContext.Provider> */}
          <div className="presale-cta-row">
            {isPrivateSale && active && isPresaleLive && isApproved && !isDepositing ? (
              <label className='presale-tnc'>
                <input type="checkbox" checked={checkedTAC} onChange={() => setCheckedTAC(!checkedTAC)} />
                <span style={{ paddingLeft: 10 }}>I agree to the <button onClick={() => setDisplayTAC(true)}>terms and conditions</button></span>
              </label>
            ) : null}
            <div className="connect-btn-wrapper">{ctaBtn}</div>
          </div>

          <div className="presale-info-grid">
            <GlowBorderedCard
              tag={
                SALE_TYPE === '0'
                  ? '86% Discount to Market'
                  : '66% Discount to Market'
              }
              title="Market Price"
              content={`$${marketPrice?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) ?? '0.00'
                }`}
            />
            <GlowBorderedCard 
              title="Discount Price" 
              content={getDiscountedPrice(marketPrice, parseInt(DISCOUNT_LIST[1].title))} 
              banner={DISCOUNT_LIST[1].title}
            />
            <GlowBorderedCard
              title="Your Balance"
              content={`${getNormalizedPriceString(xjoyBalance ?? 0)} xJOY`}
            />
            <GlowBorderedCard
              title="USD Value"
              content={`$${getNormalizedPriceString(Number(marketPrice) * (xjoyBalance ?? 0))}`}
            />
          </div>

          <div className="user-guide">
            <p>
              {SALE_TYPE === '0'
                ? 'When purchasing $JOY during this seed round period you will receive a 86% discount off of the public sale price.'
                : 'When purchasing $JOY via this OTC deal you will receive a 55% discount off of the current trading price.'}
            </p>
            <p>
              {SALE_TYPE === '0'
                ? 'After you purchase $JOY in our seed round your coins will automatically be staked in $xJOY. You will begin to earn rewards and grow your holdings as soon as staking is live! A portion of your staking rewards will be instantly unlocked.'
                : 'After purchasing $JOY in our private sale, your coins will automatically be put into $xJOY.'}
            </p>
            <p>
              {SALE_TYPE === '0'
                ? '$JOY tokens purchased during the seed round will be locked in $xJOY for 8 months and begin vesting for 40 months.'
                : '$JOY tokens purchased via this OTC sale will be locked in $xJOY for 12 months and then will vest over 24 months.'}
            </p>
            <p>
              <i>
                *Please note that $xJOY tokens will be locked to the wallet address<br/>
                they were purchased from until $JOY tokens are claimed.*
              </i>
            </p>
          </div>
        </div>
      </div>

      <div className="presale-instruction">
        <button
          // href="https://docs.joystickgames.com/11.-how-to-buy-public-sale"
          className="presale-instruction-cta"
          onClick={() => setVisibleHowToModal(true)}
        >
          Click Here
        </button>{' '}
        for OTC buying instructions
      </div>
      <ReactTooltip id="sale-end-countdown" type="success" effect="solid">
        <p className="presale-tooltip">
          Invest into Joystick at our IDO price before it hits the public! Our
          sale period ends soon
        </p>
      </ReactTooltip>
      <HowToBuyModal isVisibleHowToModal={isVisibleHowToModal} setVisibleHowToModal={setVisibleHowToModal} />
      <DepositConfirmModal isVisibleDepositConfirmModal={isShownDepositConfirmModal} setVisibleDepositConfirmModal={setVisibleDepositConfirmModal} />
    </div>
  );
};

export default PresalePanel;
