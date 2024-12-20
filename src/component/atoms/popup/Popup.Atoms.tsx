import React, { ReactNode } from 'react';
import './Popup.Atoms.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupAtoms: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div role="overlay" className="popup-atoms-overlay" onClick={onClose}>
      <div
        role="dialog"
        className={'popup-atoms'}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-atoms-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupAtoms;
