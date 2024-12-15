import React from 'react';
import SelectedWhiteButton from '../../molecules/button/SelectedWhiteButton';
import './Buttons.Organisms.css';

const ModeButtons: React.FC = () => {
  return (
    <div className="buttons-container">
      <SelectedWhiteButton text="総人口" onClick={() => alert('総人口')} />
      <SelectedWhiteButton text="年少人口" onClick={() => alert('年少人口')} />
      <SelectedWhiteButton
        text="生産年齢人口"
        onClick={() => alert('生産年齢人口')}
      />
      <SelectedWhiteButton text="老年人口" onClick={() => alert('老年人口')} />
    </div>
  );
};

export default ModeButtons;
