import React from 'react';
import ImgAtoms from '../../atoms/img/ImgAtoms';
import './ImgLogo.css';

interface LogoProps {
  img_src: string;
  alt?: string;
}

const ImgLogo: React.FC<LogoProps> = ({ img_src, alt }) => {
  return <ImgAtoms img_src={img_src} alt={alt} className={'logo'} />;
};

export default ImgLogo;
