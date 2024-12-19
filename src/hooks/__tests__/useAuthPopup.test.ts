import { act, renderHook } from '@testing-library/react';
import useAuthPopup from '../useAuthPopup';

describe('useAuthPopup', () => {
  it('should initialize with both popups closed', () => {
    const { result } = renderHook(() => useAuthPopup());

    expect(result.current.openLoginPopup).toBe(false);
    expect(result.current.openRegisterPopup).toBe(false);
  });

  it('should open the login popup and close the register popup', () => {
    const { result } = renderHook(() => useAuthPopup());

    act(() => {
      result.current.handleOpenLoginPopup();
    });

    expect(result.current.openLoginPopup).toBe(true);
    expect(result.current.openRegisterPopup).toBe(false);
  });

  it('should open the register popup and close the login popup', () => {
    const { result } = renderHook(() => useAuthPopup());

    act(() => {
      result.current.handleOpenRegisterPopup();
    });

    expect(result.current.openRegisterPopup).toBe(true);
    expect(result.current.openLoginPopup).toBe(false);
  });

  it('should close both popups when handleClosePopup is called', () => {
    const { result } = renderHook(() => useAuthPopup());

    act(() => {
      result.current.handleOpenLoginPopup();
    });

    act(() => {
      result.current.handleClosePopup();
    });

    expect(result.current.openLoginPopup).toBe(false);
    expect(result.current.openRegisterPopup).toBe(false);
  });
});
