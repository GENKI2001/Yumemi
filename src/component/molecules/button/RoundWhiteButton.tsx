import React from 'react';
import ButtonAtoms from '../../atoms/button/ButtonAtoms';
import './Button.Molecules.css';

interface LogoProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const RoundWhiteButton: React.FC<LogoProps> = ({ text, onClick, disabled }) => {
  return (
    <ButtonAtoms
      text={text}
      className="round-white-button"
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default RoundWhiteButton;
