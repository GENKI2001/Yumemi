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
    <div role="overlay" className="popup-overlay" onClick={onClose}>
      <div
        role="dialog"
        className="popup"
        onClick={(e) => e.stopPropagation()} // 内部クリックで閉じるイベントを停止
      >
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupAtoms;
