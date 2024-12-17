import React from 'react';
import Checkbox from '../../atoms/checkbox/CheckboxAtoms';
import './CheckboxGrid.css';

interface CheckboxOption {
  label: string;
  onChange: () => void;
  checked: boolean;
  disabled?: boolean;
}

interface CheckboxGridProps {
  options: CheckboxOption[];
  columns?: number;
}

const CheckboxGrid: React.FC<CheckboxGridProps> = ({
  options,
  columns = 3,
}) => {
  return (
    <div
      data-testid="checkbox-grid"
      className={`grid-container columns-${columns}`}
    >
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
