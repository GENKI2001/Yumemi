import React, { ReactNode } from 'react';
import PopupAtoms from '../../atoms/popup/Popup.Atoms';
import './TitlePopup.css';

interface PopupMoleculesProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const PopupMolecules: React.FC<PopupMoleculesProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <PopupAtoms isOpen={isOpen} onClose={onClose}>
      <div className="popup-molecules-header">
        <h2 className="popup-molecules-title">{title}</h2>
      </div>
      <div className="popup-molecules-content">{children}</div>
    </PopupAtoms>
  );
};

export default PopupMolecules;
