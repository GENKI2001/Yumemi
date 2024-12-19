import useRegisterForm from '../../../hooks/useRegisterForm';
import SelectedWhiteButton from '../../molecules/button/SelectedWhiteButton';
import TitlePopup from '../../molecules/popup/TitlePopup';
import AuthTextFields from '../../molecules/textfields/AuthTextFields';
import './LoginPopup.css';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogin: () => void;
  handleRegister: (email: string, password: string) => void;
  handleOpenLoginPopup: () => void;
}

const RegisterPopup: React.FC<LoginPopupProps> = (props) => {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailPassRegister,
  } = useRegisterForm(() => {
    props.handleRegister(email, password);
    props.handleLogin();
    props.onClose();
    alert('ユーザーを登録し、ログインしました');
  });

  return (
    <TitlePopup isOpen={props.isOpen} onClose={props.onClose} title={'Sign Up'}>
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
            text="Sign Up"
            onClick={handleEmailPassRegister}
          />
          <SelectedWhiteButton
            text="Sign In"
            onClick={props.handleOpenLoginPopup}
          />
        </div>
      </div>
    </TitlePopup>
  );
};

export default RegisterPopup;
