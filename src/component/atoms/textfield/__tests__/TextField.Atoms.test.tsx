import { fireEvent, render, screen } from '@testing-library/react';
import TextFieldAtoms from '../TextField.Atoms';

describe('TextFieldAtoms', () => {
  it('renders the label correctly', () => {
    render(
      <TextFieldAtoms
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
        error={null}
      />,
    );
    const labelElement = screen.getByText('Username');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the input field with placeholder', () => {
    render(
      <TextFieldAtoms
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
        error={null}
      />,
    );
    const inputElement = screen.getByPlaceholderText('Enter your username');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays an error message if provided', () => {
    render(
      <TextFieldAtoms
        label="Username"
        value=""
        onChange={() => {}}
        error="This field is required"
      />,
    );
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const handleChange = jest.fn();
    render(
      <TextFieldAtoms
        label="Username"
        value=""
        onChange={handleChange}
        placeholder="Enter your username"
        error={null}
      />,
    );

    const inputElement = screen.getByPlaceholderText(
      'Enter your username',
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'John' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders the input field with the correct type', () => {
    render(
      <TextFieldAtoms
        label="Password"
        value=""
        onChange={() => {}}
        placeholder="Enter your password"
        type="password"
        error={null}
      />,
    );
    const inputElement = screen.getByPlaceholderText('Enter your password');
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
