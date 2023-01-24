import './Header.scss';

import React from 'react';
import Logo from '../../../assets/img/logo.svg';
import SocialLinks from '../../../components/SocialLinks';

const Header = () => {
  return (
    <div className="home-header">
      <div className="homer-header-wrapper">
        <img className="home-header-logo" src={Logo} alt="logo" />
        <SocialLinks />
      </div>
    </div>
  );
};
export default Header;
