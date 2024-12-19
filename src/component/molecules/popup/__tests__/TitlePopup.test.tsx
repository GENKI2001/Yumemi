import { render, screen } from '@testing-library/react';
import PopupMolecules from '../TitlePopup';

describe('PopupMolecules', () => {
  it('should render the title when isOpen is true', () => {
    const title = 'Test Popup Title';

    render(
      <PopupMolecules isOpen={true} onClose={jest.fn()} title={title}>
        <div>Popup Content</div>
      </PopupMolecules>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should not render the title when isOpen is false', () => {
    const title = 'Test Popup Title';

    render(
      <PopupMolecules isOpen={false} onClose={jest.fn()} title={title}>
        <div>Popup Content</div>
      </PopupMolecules>,
    );

    expect(screen.queryByText(title)).toBeNull();
  });
});
