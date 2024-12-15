import React from 'react';
import './Img.Atoms.css';

interface ImgProps {
  img_src: string; // 画像のソースを指定するプロパティ
  alt?: string; // 画像のalt属性を指定するプロパティ
  className?: string;
}

const ImgAtoms: React.FC<ImgProps> = ({ img_src, alt, className }) => {
  return <img src={img_src} alt={alt} className={`img ${className}`} />;
};

export default ImgAtoms;
