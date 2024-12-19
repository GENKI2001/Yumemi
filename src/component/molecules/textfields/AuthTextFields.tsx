import React, { ChangeEvent } from 'react';
import TextFieldAtoms from '../../atoms/textfield/TextField.Atoms';

interface AuthTextFieldsProps {
  email: string;
  password: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  emailError?: string;
  passwordError?: string;
}

const AuthTextFields: React.FC<AuthTextFieldsProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  emailError,
  passwordError,
}) => {
  return (
    <div className="auth-textfields-container">
      <TextFieldAtoms
        label="Email Address"
        value={email}
        onChange={onEmailChange}
        placeholder="Enter your email"
        type="email"
        error={emailError}
      />
      <TextFieldAtoms
        label="Password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Enter your password"
        type="password"
        error={passwordError}
      />
    </div>
  );
};

export default AuthTextFields;
