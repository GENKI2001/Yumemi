import React from 'react';
import RoundWhiteButton from '../../molecules/button/RoundWhiteButton';
import ImgLogo from '../../molecules/logo/ImgLogo';
import './AppHeader.css';

interface AppHeaderProps {
  img_src: string;
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  handleRegister: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  img_src,
  isLoggedIn,
  handleLogout,
  handleLogin,
  handleRegister,
}) => {
  return (
    <header className={`app-header`}>
      <div className="app-header-content">
        <ImgLogo img_src={img_src} alt={'LogoImage'} />
        <div className="app-header-buttons">
          {isLoggedIn ? (
            <RoundWhiteButton
              text="Sign Out"
              onClick={() => {
                handleLogout();
                alert('ログアウトしました');
              }}
            />
          ) : (
            <>
              <RoundWhiteButton
                text="Sign In"
                onClick={() => {
                  handleLogin();
                }}
              />
              <RoundWhiteButton
                text="Sign Up"
                onClick={() => {
                  handleRegister();
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
