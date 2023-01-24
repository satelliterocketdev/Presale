import React from 'react';
import { JoyStickLogo } from '../../icons';
import SocialMedia from '../SocialMedia';

import Styles from './footer.module.scss';

export default function Footer() {
  return (
    <div className={Styles.footerWrapper}>
      <JoyStickLogo className={Styles.logo} />
      <SocialMedia />
    </div>
  );
}
