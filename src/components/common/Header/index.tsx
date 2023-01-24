import React from 'react';
import { JoyStickLogo, CloseIconMobileNav, MobileNavIcon } from '../../icons';
import imgLogo from '../../../assets/img/logo-light.png';
import NavBar from '../Navbar';

import Styles from './header.module.scss';

export default function Header({test}: {test?: boolean}) {
  const [show, setShow] = React.useState<boolean>(false);

  /******************** METHODS *************************/
  const toggleMobNav = () => {
    setShow(prev => !prev)
  };


  /******************** USE EFFECTS *************************/


  return (
    <header className={Styles.header}>
      <div className={Styles.desktop}>
        <img src={imgLogo} className={Styles.logo} alt="logo" style={{ width: 163, height: 18 }} />
        <NavBar test={test} />
      </div>

      <div className={Styles.mobile}>
        <div className={Styles.mobileNavWrapper}>
          <img src={imgLogo} className={Styles.logo} alt="logo" style={{ width: 163, height: 18 }} />
          {show ? <CloseIconMobileNav onClick={toggleMobNav} /> : <MobileNavIcon onClick={toggleMobNav} />}
        </div>
       {
         show ? <div className={Styles.navContainer}> <NavBar test={test} handleClick={() => {
           setShow(false)
         }} /></div>: null
       }
      </div>
    </header>
  );
}
