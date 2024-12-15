// ButtonAtoms.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import ButtonAtoms from '../ButtonAtoms';

describe('ButtonAtoms component', () => {
  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonAtoms onClick={handleClick} text="Click Me" />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(
      <ButtonAtoms onClick={handleClick} text="Disabled" disabled={true} />,
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply custom class name passed via the className prop', () => {
    const className = 'custom-class';
    render(
      <ButtonAtoms
        onClick={() => {}}
        text="Class Button"
        className={className}
      />,
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(className);
  });
});
