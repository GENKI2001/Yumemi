import { ChangeEvent, useState } from 'react';

interface UseLoginFormReturn {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailPassLogin: () => void;
}

const useLoginForm = (
  registeredEmail: string,
  registeredPassword: string,
  handleLogin: () => void,
): UseLoginFormReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
    setPasswordError(null);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setEmailError(null);
    setPasswordError(null);
  };

  const handleEmailPassLogin = () => {
    if (email === registeredEmail && password === registeredPassword) {
      handleLogin();
    } else {
      setEmailError('メールアドレスまたはパスワードが違います');
      setPasswordError('メールアドレスまたはパスワードが違います');
    }
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailPassLogin,
  };
};

export default useLoginForm;
