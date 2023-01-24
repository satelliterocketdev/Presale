import './Home.scss';
import 'react-multi-carousel/lib/styles.css';

import Footer from './components/Footer';
import BannerSection from './components/BannerSection';
import OverallSection from './components/OverallSection';
import RoadmapCardSection from './components/RoadmapCardSection';
// import TokenomicsSection from './components/TokenomicsSection';
import CommunitySection from './components/CommunitySection';
import InvestmentsSection from './components/InvestmentsSection';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import ContactForm from './components/ContactForm';
import TeamSection from './components/TeamSection';

const Home = ({test}: {test?: boolean}) => {
  return (
    <div className="home-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Joystick OTC</title>
        <meta name="description" content="" />
        <meta property="og:url" content="joystickgames.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="" />
        <meta property="og:site_name" content="Joystick" />
        <meta
          property="og:description"
          content="Joystick is a gaming ecosystem that let's players make money playing games they love. Members keep 100% of all earnings using our assets."
        />
        <meta
          property="og:image"
          content="https://joystickgames.com/img/logo.png"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TDFM9R4DLP"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-TDFM9R4DLP');
          `}
        </script>
      </Helmet>
      <Header test={test} />
      <BannerSection test={test} />
      <OverallSection test={test} />
      <InvestmentsSection test={test} />
      <RoadmapCardSection />
      {/* <TokenomicsSection /> */}
      <CommunitySection />
      {/* <TeamSection />
      <ContactForm /> */}
      <Footer test={test} />
    </div>
  );
};

export default Home;
