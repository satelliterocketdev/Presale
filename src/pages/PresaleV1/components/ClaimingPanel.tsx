import './ClaimingPanel.scss';

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
const data = [
  {
    date: '01/10/2022',
    purchase: 1400,
    price: '$0.10',
    xJoyAmount: 5415,
    joyClaimable: 252,
    nextClaim: 2
  },
  {
    date: '01/10/2022',
    purchase: 1400,
    price: '$0.10',
    xJoyAmount: 5415,
    joyClaimable: 252,
    nextClaim: 2
  },
  {
    date: '01/10/2022',
    purchase: 1400,
    price: '$0.10',
    xJoyAmount: 5415,
    joyClaimable: 252,
    nextClaim: 2
  },
  {
    date: '01/10/2022',
    purchase: 1400,
    price: '$0.10',
    xJoyAmount: 5415,
    joyClaimable: 252,
    nextClaim: 2
  },

]

const ClaimingPanel = () => {
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
      const price = parseFloat(res.data['joystick-games']['usd']);
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
                if (presaleInfo.xJoysRemained === 0) {
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
          <div className="presale-info-grid">
            <GlowBorderedCard
              title="Your Balance"
              content={`${getNormalizedPriceString(xjoyBalance ?? 0)} xJOY`}
            />
            <GlowBorderedCard
              title="USD Value"
              content={`$${getNormalizedPriceString(Number(marketPrice) * (xjoyBalance ?? 0))}`}
            />
          </div>
          <div className="claim-cta-row">
            <div className="connect-btn-wrapper">
              <ActionButton
                onClick={() => {
                  console.log(`===== claim =====`);
                }}
              >
                {`Claim`}
              </ActionButton>
            </div>
          </div>
          <div className="user-guide">
            <h3>Your Balance</h3>
            <div className="claim-table">
              <table>
                <table>
                  <tr>
                    <th>Date</th>
                    <th>Purchase</th>
                    <th>Price</th>
                    <th>xJOY Amount</th>
                    <th>JOY Claimable</th>
                    <th>Next Claim</th>
                  </tr>
                  {
                    data.map((row, index) => {

                      return (
                        <tr>
                          <td>{row.date}</td>
                          <td>{row.purchase}</td>
                          <td>{row.price}</td>
                          <td>{row.xJoyAmount}</td>
                          <td>{row.joyClaimable}</td>
                          <td>{row.nextClaim}</td>
                        </tr>
                      )
                    })
                  }
                </table>
              </table>
            </div>
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

export default ClaimingPanel;
