import React from 'react';
import './Button.Atoms.css';

interface ImgProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const ButtonAtoms: React.FC<ImgProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`button ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonAtoms;
