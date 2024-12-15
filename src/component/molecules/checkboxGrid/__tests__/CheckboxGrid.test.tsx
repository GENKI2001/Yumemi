import { fireEvent, render, screen } from '@testing-library/react';
import CheckboxGrid from '../CheckboxGrid';

describe('CheckboxGrid Component', () => {
  const mockOnChange = jest.fn();
  const mockOptions = [
    { label: 'Option 1', checked: false, onChange: mockOnChange },
    { label: 'Option 2', checked: true, onChange: mockOnChange },
    {
      label: 'Option 3',
      checked: false,
      onChange: mockOnChange,
      disabled: true,
    },
  ];

  // チェックボックスの個数が正しいことを確認
  test('renders the correct number of checkboxes', () => {
    render(<CheckboxGrid options={mockOptions} columns={2} />);

    const checkboxes = screen.getAllByTestId('checkbox-input');
    expect(checkboxes).toHaveLength(mockOptions.length);
  });

  // チェックボックスの各ラベルが正しく表示されることを確認
  test('renders the labels correctly', () => {
    render(<CheckboxGrid options={mockOptions} columns={2} />);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  // チェックボックスがクリックされたときに、正しくonChangeが呼び出されることを確認
  test('calls onChange with the correct arguments when a checkbox is clicked', () => {
    render(<CheckboxGrid options={mockOptions} columns={2} />);

    const checkbox = screen.getAllByTestId('checkbox-input')[0];
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  // オプションに基づいてチェックボックスを正しく無効にすることを確認
  test('disables checkboxes correctly based on the options', () => {
    render(<CheckboxGrid options={mockOptions} columns={2} />);

    const checkboxes = screen.getAllByTestId('checkbox-input');

    expect(checkboxes[0]).not.toBeDisabled();
    expect(checkboxes[1]).not.toBeDisabled();
    expect(checkboxes[2]).toBeDisabled();
  });
});
