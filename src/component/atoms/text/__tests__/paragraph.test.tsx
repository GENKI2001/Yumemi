// Atoms/Paragraph.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Paragraph } from './../Paragraph';

describe('Paragraph Component', () => {
  it('renders the correct children', () => {
    render(<Paragraph>Hello World</Paragraph>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as a <p> tag', () => {
    render(<Paragraph>Paragraph Test</Paragraph>);
    const paragraph = screen.getByText('Paragraph Test');
    expect(paragraph.tagName).toBe('P');
  });

  it('applies the correct className', () => {
    render(<Paragraph className="custom-class">Styled Paragraph</Paragraph>);
    const paragraph = screen.getByText('Styled Paragraph');
    expect(paragraph).toHaveClass('custom-class');
  });

  it('renders multiple children correctly', () => {
    render(
      <Paragraph>
        <span>Child 1</span>
        <span>Child 2</span>
      </Paragraph>,
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
