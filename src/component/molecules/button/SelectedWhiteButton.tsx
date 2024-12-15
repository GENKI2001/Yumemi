import React from 'react';
import ButtonAtoms from '../../atoms/button/ButtonAtoms';
import './Button.Molecules.css';

interface LogoProps {
  text: string; // ボタンのテキスト
  isSelected?: boolean; // 選択状態
  onClick: () => void; // クリックイベントを受け取るプロパティ
  disabled?: boolean; // ボタンの無効化状態
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
