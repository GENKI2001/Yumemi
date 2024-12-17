import React from 'react';
import { HeadingOneAtoms } from '../../atoms/text/HeadingOneAtoms';
import { Paragraph } from '../../atoms/text/Paragraph';
import './TitleDescription.css';

type SectionProps = {
  title: string;
  description: string;
  className?: string;
};

export const TitleDescription: React.FC<SectionProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <section className={`title-description ${className}`} data-testid="section">
      <HeadingOneAtoms>{title}</HeadingOneAtoms>
      <Paragraph>{description}</Paragraph>
    </section>
  );
};
