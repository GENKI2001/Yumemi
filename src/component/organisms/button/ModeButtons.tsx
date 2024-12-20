import React from 'react';
import {
  PopulationLabel,
  populationLabels,
} from '../../../interface/population';
import SelectedWhiteButton from '../../molecules/button/SelectedWhiteButton';
import './Buttons.Organisms.css';

interface ModeButtonsProps {
  mode: PopulationLabel;
  onClick: (mode: PopulationLabel) => void;
}

const ModeButtons: React.FC<ModeButtonsProps> = (props) => {
  return (
    <div className="mode-buttons-container">
      {populationLabels.map((label: PopulationLabel) => (
        <SelectedWhiteButton
          key={label}
          text={label}
          isSelected={props.mode === label}
          onClick={() => props.onClick(label)}
        />
      ))}
    </div>
  );
};

export default ModeButtons;
