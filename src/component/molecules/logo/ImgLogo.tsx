import React from 'react';
import ImgAtoms from '../../atoms/img/ImgAtoms';
import './ImgLogo.css';

interface LogoProps {
  img_src: string; // 画像のソースを指定するプロパティ
  alt?: string; // 画像のalt属性を指定するプロパティ
}

const ImgLogo: React.FC<LogoProps> = ({ img_src, alt }) => {
  return <ImgAtoms img_src={img_src} alt={alt} className={'logo'} />;
};

export default ImgLogo;
