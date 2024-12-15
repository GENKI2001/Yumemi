// molecules/CheckboxGrid.tsx
import React from 'react';
import Checkbox from '../../atoms/checkbox/CheckboxAtoms';
import './CheckboxGrid.css';

interface CheckboxOption {
  label: string; // チェックボックスのラベル
  onChange: () => void; // チェックボックスの変更イベント
  checked: boolean; // チェック状態
  disabled?: boolean; // チェックボックスの無効化状態
}

interface CheckboxGridProps {
  options: CheckboxOption[]; // チェックボックスのオプション
  columns?: number; // カラム数
}

const CheckboxGrid: React.FC<CheckboxGridProps> = ({
  options,
  columns = 3, // Default to 3 columns
}) => {
  return (
    <div className={`grid-container columns-${columns}`}>
      {options.map((option, index) => (
        <Checkbox
          key={index}
          label={option.label}
          checked={option.checked}
          disabled={option.disabled}
          onChange={() => option.onChange()}
        />
      ))}
    </div>
  );
};

export default CheckboxGrid;
