import './TokenomicsSection.scss';

import TokenomicsEllipsImg from '../../../assets/img/tokenomics-ellipse.png';

const Tokenomics = () => {
  return (
    <section className="tokenomics-section">
      <div className="title-txt48">Tokenomics</div>
      <div className="grid2">
        <div className="circle-bg">
          <div className="p-txt22">
            <div className="txt-p1">4.10%</div>
            <div className="txt-p2">10.07%</div>
            <div className="txt-p3">30.11%</div>
            <div className="txt-p4">14.07%</div>
            <div className="txt-p5">21.03%</div>
            <div className="txt-p6">20.52%</div>
          </div>
          <div className="blur-bg">
            <img
              className="rect-size"
              src={TokenomicsEllipsImg}
              alt="ellipse"
            />
          </div>
        </div>
        <div className="flex-mt116">
          <div>
            <div className="flex-txt">
              <span className="col-box col1" />
              <span className="txt22">
                <span className="txt1">DAO Treasury - </span>
                <span className="txt2">30.11%</span>
              </span>
              <span className="txt16">(301,100,000 JOY tokens)</span>
            </div>
            <div className="flex-txt">
              <span className="col-box col2" />
              <span className="txt22">
                <span className="txt1">Staking Rewards - </span>
                <span className="txt2">20.52%</span>
              </span>
              <span className="txt16">(206,200,000 JOY tokens)</span>
            </div>
            <div className="flex-txt">
              <span className="col-box col3" />
              <span className="txt22">
                <span className="txt1">Team/Advisors - </span>
                <span className="txt2">21.03%</span>
              </span>
              <span className="txt16">(210,300,000 JOY tokens)</span>
            </div>
            <div className="flex-txt">
              <span className="col-box col4" />
              <span className="txt22">
                <span className="txt1">Early Investors - </span>
                <span className="txt2">14.07%</span>
              </span>
              <span className="txt16">(140,700,000 JOY tokens)</span>
            </div>
            <div className="flex-txt">
              <span className="col-box col5" />
              <span className="txt22">
                <span className="txt1">LP Rewards - </span>
                <span className="txt2">10.07%</span>
              </span>
              <span className="txt16">(100,700,000 JOY tokens)</span>
            </div>
            <div className="flex-txt">
              <span className="col-box col6" />
              <span className="txt22">
                <span className="txt1">Public Distribution - </span>
                <span className="txt2">4.10%</span>
              </span>
              <span className="txt16">(41,000,000 JOY tokens)</span>
            </div>

            <div className="txt24">
              <span className="txt1">Total Supply - </span>
              <span className="txt2">1,000,000,000 JOY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Tokenomics;
