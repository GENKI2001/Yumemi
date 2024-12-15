import React from 'react';
import ButtonAtoms from '../../atoms/button/ButtonAtoms';
import './Button.Molecules.css';

interface LogoProps {
  text: string; // 画像のソースを指定するプロパティ
  onClick: () => void; // クリックイベントを受け取るプロパティ
  disabled?: boolean; // ボタンの無効化状態
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
