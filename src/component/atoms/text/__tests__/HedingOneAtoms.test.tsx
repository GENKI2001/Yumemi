import { render, screen } from '@testing-library/react';
import { HeadingOneAtoms } from '../HeadingOneAtoms';
describe('H1 Component', () => {
  it('renders the correct children', () => {
    render(<HeadingOneAtoms>Hello World</HeadingOneAtoms>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    render(
      <HeadingOneAtoms className="custom-class">
        Styled Heading
      </HeadingOneAtoms>,
    );
    const heading = screen.getByText('Styled Heading');
    expect(heading).toHaveClass('custom-class');
  });

  it('renders as an h1 element', () => {
    render(<HeadingOneAtoms>Semantic Test</HeadingOneAtoms>);
    const heading = screen.getByText('Semantic Test');
    expect(heading.tagName).toBe('H1');
  });
});
