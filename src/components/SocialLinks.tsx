import './SocialLinks.scss';

import TwitterIcon from '../assets/img/icon-twitter.svg';
import DiscordIcon from '../assets/img/icon-discord.svg';
import MediumIcon from '../assets/img/icon-medium.svg';
import GitbookIcon from '../assets/img/icon-gitbook.svg';

const socialData = [
  {
    title: 'Twitter',
    icon: TwitterIcon,
    url: 'https://twitter.com/joystickpros/',
  },
  {
    title: 'Discord',
    icon: DiscordIcon,
    url: 'https://discord.gg/JoystickGames/',
  },
  {
    title: 'Medium',
    icon: MediumIcon,
    url: 'https://joystick-games.medium.com/',
  },
  {
    title: 'GotBook',
    icon: GitbookIcon,
    url: 'https://docs.joystickgames.com/',
  },
];

const SocialLinks = () => {
  return (
    <div className="socials">
      {socialData.map((item) => (
        <a
          href={item.url}
          key={item.title}
          className="icon link-p"
          target="_blank"
          rel="noreferrer"
        >
          <img src={item.icon} alt={item.title} title={item.title} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
