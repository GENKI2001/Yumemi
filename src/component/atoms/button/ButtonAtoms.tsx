import React from 'react';
import './Button.Atoms.css';

interface ImgProps {
  text: string; // 画像のソースを指定するプロパティ
  onClick: () => void; // クリックイベントを受け取るプロパティ
  className?: string; // クラス名を指定するプロパティ
  disabled?: boolean; // ボタンの無効化状態
}

const ButtonAtoms: React.FC<ImgProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick} // disabledの場合はonClickを確実に発火させない
      disabled={disabled} // 明示的にdisabledを適用
      className={`button ${className}`} // 親コンポーネントからクラスを追加可能に
    >
      {text}
    </button>
  );
};

export default ButtonAtoms;
