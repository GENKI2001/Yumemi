import { useState } from 'react';

interface UseAuthPopupReturn {
  openLoginPopup: boolean;
  openRegisterPopup: boolean;
  handleOpenLoginPopup: () => void;
  handleOpenRegisterPopup: () => void;
  handleClosePopup: () => void;
}

// ログイン・新規登録のポップアップを制御するためのカスタムフック
const useAuthPopup = (): UseAuthPopupReturn => {
  const [openLoginPopup, setOpenLoginPopup] = useState<boolean>(false);
  const [openRegisterPopup, setOpenRegisterPopup] = useState<boolean>(false);

  const handleOpenLoginPopup = () => {
    setOpenLoginPopup(true);
    setOpenRegisterPopup(false);
  };

  const handleOpenRegisterPopup = () => {
    setOpenLoginPopup(false);
    setOpenRegisterPopup(true);
  };

  const handleClosePopup = () => {
    setOpenLoginPopup(false);
    setOpenRegisterPopup(false);
  };

  return {
    openLoginPopup,
    openRegisterPopup,
    handleOpenLoginPopup,
    handleOpenRegisterPopup,
    handleClosePopup,
  };
};

export default useAuthPopup;
