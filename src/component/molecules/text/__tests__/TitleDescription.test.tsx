// Molecules/Section.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TitleDescription } from '../TitleDescription';

describe('Section Component', () => {
  it('renders the title and description', () => {
    render(
      <TitleDescription
        title="Section Title"
        description="This is a description."
      />,
    );
    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('This is a description.')).toBeInTheDocument();
  });

  it('applies the correct className to the section', () => {
    render(
      <TitleDescription
        title="Section Title"
        description="This is a description."
        className="custom-section-class"
      />,
    );
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('custom-section-class');
  });
});
