// Atoms/Heading.tsx
import React from 'react';
import './Text.Atoms.css';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export const HeadingOneAtoms: React.FC<HeadingProps> = ({
  children,
  className,
}) => <h1 className={`h1 ${className}`}>{children}</h1>;
