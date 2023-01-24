import './InvestmentsNavigator.scss';

import BtnLeft from '../../../assets/img/btn-left.png';
import BtnRight from '../../../assets/img/btn-right.png';

const InvestmentsNavigator: React.FunctionComponent<any> = ({
  previous,
  next,
}) => {
  return (
    <div className="investments-navigator">
      <img
        className="arrow-size cursor-p"
        src={BtnLeft}
        alt="left btn"
        onClick={previous}
      />
      <img
        className="arrow-size cursor-p"
        src={BtnRight}
        alt="right btn"
        onClick={next}
      />
    </div>
  );
};

export default InvestmentsNavigator;
