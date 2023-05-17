import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

import styles from './Modal.module.css';

export type ModalType = {
  children?: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
};

function Modal({ children, isOpen, onRequestClose }: ModalType) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <div className={styles.header}>
        <button onClick={onRequestClose}>Close</button>
      </div>
      {children}
    </ReactModal>
  );
}
export default Modal;
