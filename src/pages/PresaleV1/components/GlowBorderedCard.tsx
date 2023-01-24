import './GlowBorderedCard.scss';
import logoMarketPrice from '../../../assets/img/logo-market-price-coingecko.png';

const GlowBorderedCard = (props: {
  tag?: string;
  title: string;
  content: string;
  banner?: string;
}) => {
  return (
    <div className="glow-bordered-card">
      {props.title === 'Discount Price' ? (
        <div className="glow-bordered-ribbon-wrapper">
          <div className="glow-bordered-ribbon">{props.banner}</div>
        </div>
      ) : null}
      <div className="glow-bordered-border-h top" />
      <div className="glow-bordered-border-v right" />
      <div className="glow-bordered-border-h bottom" />
      <div className="glow-bordered-border-v left" />
      {/* {props.tag && <div className="glow-bordered-tag">{props.tag}</div>} */}
      <div className="glow-bordered-title-box">
        {props.title === 'Market Price' ? (
          <img
            src={logoMarketPrice}
            className="glow-bordered-logo-image"
          />
        ) : null}

        <div className="glow-bordered-title">{props.title}</div>
      </div>
      <div className="glow-bordered-bar" />
      <div className="glow-bordered-content">{props.content}</div>
    </div>
  );
};

export default GlowBorderedCard;
