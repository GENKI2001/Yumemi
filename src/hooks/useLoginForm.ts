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

const useLoginForm = (handleLogin: () => void): UseLoginFormReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // 今回はフロントエンドのみの開発なので、ログイン情報は固定
  const LOGIN_EMAIL = 'example@gmail.com';
  const LOGIN_PASSWORD = 'password';

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
    if (email === LOGIN_EMAIL && password === LOGIN_PASSWORD) {
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
