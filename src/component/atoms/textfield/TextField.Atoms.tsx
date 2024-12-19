import React, { ChangeEvent } from 'react';
import './TextField.Atoms.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const TextFieldAtoms: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  error,
}) => {
  return (
    <div className="textfield-container">
      <label className="textfield-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`textfield-input ${error ? 'textfield-input-error' : ''}`}
      />
      {error && <div className="textfield-error">{error}</div>}
    </div>
  );
};

export default TextFieldAtoms;
