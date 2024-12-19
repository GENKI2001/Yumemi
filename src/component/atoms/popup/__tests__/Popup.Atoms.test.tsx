// PopupAtoms.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import PopupAtoms from '../Popup.Atoms'; // パスはあなたのファイル構造に合わせて変更

describe('PopupAtoms', () => {
  it('should not render when isOpen is false', () => {
    render(
      <PopupAtoms isOpen={false} onClose={jest.fn()}>
        {'Popup Content'}
      </PopupAtoms>,
    );
    const popupOverlay = screen.queryByRole('overlay');
    expect(popupOverlay).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(
      <PopupAtoms isOpen={true} onClose={jest.fn()}>
        {'Popup Content'}
      </PopupAtoms>,
    );
    const popupOverlay = screen.queryByRole('overlay');
    expect(popupOverlay).toBeInTheDocument();
  });

  it('should call onClose when clicking on the overlay', () => {
    const onClose = jest.fn();
    render(
      <PopupAtoms isOpen={true} onClose={onClose}>
        {'Popup Content'}
      </PopupAtoms>,
    );

    const overlay = screen.getByRole('overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking inside the popup', () => {
    const onClose = jest.fn();
    render(
      <PopupAtoms isOpen={true} onClose={onClose}>
        {'Popup Content'}
      </PopupAtoms>,
    );

    const popup = screen.getByRole('dialog');
    fireEvent.click(popup);
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it('should render children when isOpen is true', () => {
    render(
      <PopupAtoms isOpen={true} onClose={jest.fn()}>
        <div>Popup Content</div>
      </PopupAtoms>,
    );

    const popupContent = screen.getByText('Popup Content');
    expect(popupContent).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <PopupAtoms isOpen={true} onClose={onCloseMock}>
        <div>Popup Content</div>
      </PopupAtoms>,
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
