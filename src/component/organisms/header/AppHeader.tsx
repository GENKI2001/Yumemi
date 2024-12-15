import React from 'react';
import RoundWhiteButton from '../../molecules/button/RoundWhiteButton';
import ImgLogo from '../../molecules/logo/ImgLogo';
import './AppHeader.css';

interface AppHeaderProps {
  img_src: string; // ロゴ画像のソースを指定するプロパティ
}

const AppHeader: React.FC<AppHeaderProps> = ({ img_src }) => {
  return (
    <header className={`app-header`}>
      <div className="app-header-content">
        <ImgLogo img_src={img_src} alt={'LogoImage'} />
        <div className="app-header-buttons">
          <RoundWhiteButton
            text="Sign In"
            onClick={() => {
              alert('Sign In');
            }}
          />
          <RoundWhiteButton
            text="Sign Up"
            onClick={() => {
              alert('Sign In');
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
