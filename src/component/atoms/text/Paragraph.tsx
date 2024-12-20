import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export const Paragraph: React.FC<HeadingProps> = ({ children, className }) => (
  <p className={`p-atoms ${className}`}>{children}</p>
);
