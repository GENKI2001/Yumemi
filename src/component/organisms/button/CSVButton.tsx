import React from 'react';
import SelectedWhiteButton from '../../molecules/button/SelectedWhiteButton';
import './Buttons.Organisms.css';

interface CSVButtonProps {
  onClick: () => void;
}

const CSVButton: React.FC<CSVButtonProps> = (props) => {
  return (
    <SelectedWhiteButton
      text="CSVダウンロード"
      isSelected={false}
      onClick={props.onClick}
    />
  );
};

export default CSVButton;
