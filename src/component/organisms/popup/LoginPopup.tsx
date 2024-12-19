import { ChangeEvent } from 'react';
import SelectedWhiteButton from '../../molecules/button/SelectedWhiteButton';
import TitlePopup from '../../molecules/popup/TitlePopup';
import AuthTextFields from '../../molecules/textfields/AuthTextFields';
import './LoginPopup.css';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  password: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  emailError?: string;
  passwordError?: string;
  handleLogin: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = (props) => {
  return (
    <TitlePopup isOpen={props.isOpen} onClose={props.onClose} title={'Sign In'}>
      <div className="auth-container">
        <AuthTextFields
          email={props.email}
          password={props.password}
          onEmailChange={props.onEmailChange}
          onPasswordChange={props.onPasswordChange}
          emailError={props.emailError}
          passwordError={props.passwordError}
        />
        <div className="auth-button-container">
          <SelectedWhiteButton
            isSelected
            text="Sign In"
            onClick={props.onClose}
          />
          <SelectedWhiteButton text="Sign Up" onClick={props.onClose} />
        </div>
      </div>
    </TitlePopup>
  );
};

export default LoginPopup;
