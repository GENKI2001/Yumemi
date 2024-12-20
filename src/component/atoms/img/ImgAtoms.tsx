import React from 'react';
import './Img.Atoms.css';

interface ImgProps {
  img_src: string;
  alt?: string;
  className?: string;
}

const ImgAtoms: React.FC<ImgProps> = ({ img_src, alt, className }) => {
  return <img src={img_src} alt={alt} className={`img-atoms ${className}`} />;
};

export default ImgAtoms;
