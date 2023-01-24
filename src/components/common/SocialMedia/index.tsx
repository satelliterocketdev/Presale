import React from 'react';

import { Discord, Medium, Twitter, GitBook, Telegram } from '../../icons';
import GitBookIcon from '../../../assets/img/icon-gitbook.svg';
import Styles from './social-media.module.scss';

type SocialMediaProps = {
  className?: string;
};

export default function SocialMedia({ className = '' }: SocialMediaProps) {
  return (
    <>
      <div className={`${Styles.socialIcons} ${className}`}>
        <a
          href="https://t.me/JoystickCommunity"
          target="_blank"
          rel="noreferrer"
        >
          <Telegram className={Styles.icon} />
        </a>
        <a
          href="https://twitter.com/joystickpros"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter className={Styles.icon} />
        </a>
        <a
          href="https://discord.gg/JoystickGames"
          target="_blank"
          rel="noreferrer"
        >
          <Discord className={Styles.icon} />
        </a>

        <a
          href="https://joystick-games.medium.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Medium className={Styles.icon} />
        </a>

        {/* <a
          href="http://docs.joystickgames.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={GitBookIcon} className={Styles.icon} alt="" />
        </a> */}
      </div>
    </>
  );
}
