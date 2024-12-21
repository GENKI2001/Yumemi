import { ChangeEvent, useState } from 'react';

interface UseLoginFormReturn {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailPassRegister: () => void;
}

// 新規登録フォームの入力値を制御するためのカスタムフック
const useRegisterForm = (handleLogin: () => void): UseLoginFormReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'メールアドレスの形式が正しくありません';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'パスワードは6文字以上で入力してください';
    }
    return null;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  // フロントエンドのみの開発なので、実際にはサーバーにリクエストを送信する処理は省略。
  // エラーがなければ、そのままログインへ通す
  const handleEmailPassRegister = () => {
    if (emailError || passwordError) {
      return;
    } else {
      handleLogin();
    }
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailPassRegister,
  };
};

export default useRegisterForm;
