// atoms/__tests__/Checkbox.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './../CheckboxAtoms';

describe('Checkbox', () => {
  const defaultProps = {
    label: 'Test Checkbox',
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox with label correctly', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByTestId('checkbox-atoms-label');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test Checkbox');
  });

  it('is checked when checked is true', () => {
    render(<Checkbox {...defaultProps} checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('is unchecked when checked is false', () => {
    render(<Checkbox {...defaultProps} checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onChange handler when clicked', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByTestId('checkbox-input');
    fireEvent.click(checkbox);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox {...defaultProps} disabled={true} />);

    const checkbox = screen.getByTestId('checkbox-input');
    expect(checkbox).toBeDisabled();
  });

  it('does not call onChange when disabled', () => {
    render(<Checkbox {...defaultProps} disabled={true} />);

    const checkbox = screen.getByTestId('checkbox-input');
    fireEvent.click(checkbox);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(0);
  });
});
