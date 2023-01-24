import { FC, HTMLAttributes } from 'react';
import './ActionButton.scss';

const ActionButton: FC<
  HTMLAttributes<HTMLButtonElement> & { disabled?: boolean; color?: string }
> = ({ children, color, ...props }) => {
  return (
    <button
      className="presale-action-btn"
      style={{
        background: color === 'red' ? '#e43623' : undefined,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
