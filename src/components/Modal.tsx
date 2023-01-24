import { FC, useEffect } from 'react';
import ReactModal from 'react-modal';

const Modal: FC<ReactModal.Props> = ({ children, ...props }) => {
  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [props.isOpen]);

  return (
    <ReactModal
      {...props}
      style={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.9)',
          ...props.style?.overlay,
        },
        content: {
          padding: 0,
          border: 'none',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          overflow: 'visible',
          ...props.style?.content,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
