import React from 'react';
import ButtonAtoms from '../../atoms/button/ButtonAtoms';
import './Button.Molecules.css';

interface LogoProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const SelectedWhiteButton: React.FC<LogoProps> = ({
  text,
  onClick,
  isSelected,
  disabled,
}) => {
  return (
    <ButtonAtoms
      text={text}
      className={`selected-white-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default SelectedWhiteButton;
