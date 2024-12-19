import useLoginForm from '../../../hooks/useLoginForm';
import SelectedWhiteButton from '../../molecules/button/SelectedWhiteButton';
import TitlePopup from '../../molecules/popup/TitlePopup';
import AuthTextFields from '../../molecules/textfields/AuthTextFields';
import './LoginPopup.css';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogin: () => void;
  handleOpenRegisterPopup: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = (props) => {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailPassLogin,
  } = useLoginForm(() => {
    props.handleLogin();
    props.onClose();
  });

  return (
    <TitlePopup isOpen={props.isOpen} onClose={props.onClose} title={'Sign In'}>
      <div className="auth-container">
        <AuthTextFields
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          emailError={emailError}
          passwordError={passwordError}
        />
        <div className="auth-button-container">
          <SelectedWhiteButton
            isSelected
            text="Sign In"
            onClick={handleEmailPassLogin}
          />
          <SelectedWhiteButton
            text="Sign Up"
            onClick={props.handleOpenRegisterPopup}
          />
        </div>
      </div>
    </TitlePopup>
  );
};

export default LoginPopup;
