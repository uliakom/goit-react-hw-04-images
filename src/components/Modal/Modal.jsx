import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Backdrop, ModalWindow, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, alt, onClose }) => {
  const handleEscClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  return createPortal(
    <Backdrop onClick={onClose}>
      <ModalWindow>
        <Image src={url} alt={alt} />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  onClose: PropTypes.func,
};
