import React from 'react';
import './Checkbox.Atoms.css';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="checkbox-atoms-container">
      <input
        type="checkbox"
        data-testid="checkbox-atoms-input"
        checked={checked}
        onChange={() => {
          if (!disabled) {
            onChange();
          }
        }}
        disabled={disabled}
        className="checkbox-atoms-input"
      />
      <label
        onClick={() => {
          if (!disabled) {
            onChange();
          }
        }}
        className="checkbox-atoms-label"
        data-testid="checkbox-atoms-label"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
