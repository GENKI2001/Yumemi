import React from 'react';
import './Checkbox.Atoms.css';

interface CheckboxProps {
  label: string; // チェックボックスのラベル
  checked: boolean; // チェック状態
  onChange: () => void; // 変更イベント
  disabled?: boolean; // 無効化状態
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        data-testid="checkbox-input"
        checked={checked}
        onChange={(e) => {
          if (!disabled) {
            onChange();
          }
        }}
        disabled={disabled}
        className="checkbox-input"
      />
      <label className="checkbox-label" data-testid="checkbox-atoms-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
