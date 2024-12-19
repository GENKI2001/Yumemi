import { act, renderHook } from '@testing-library/react';
import useRegisterForm from '../useRegisterForm';

describe('useRegisterForm', () => {
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    mockHandleLogin.mockClear();
  });

  it('initializes with empty fields and no errors', () => {
    const { result } = renderHook(() => useRegisterForm(mockHandleLogin));

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.emailError).toBeNull();
    expect(result.current.passwordError).toBeNull();
  });

  it('validates email format correctly', () => {
    const { result } = renderHook(() => useRegisterForm(mockHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.emailError).not.toBeNull();
  });

  it('validates password length correctly', () => {
    const { result } = renderHook(() => useRegisterForm(mockHandleLogin));

    act(() => {
      result.current.handlePasswordChange({
        target: { value: '123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.passwordError).not.toBeNull();
  });

  it('registers successfully with valid email and password', () => {
    const { result } = renderHook(() => useRegisterForm(mockHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: 'password123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleEmailPassRegister();
    });

    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });

  it('does not register if there are validation errors', () => {
    const { result } = renderHook(() => useRegisterForm(mockHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: '123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleEmailPassRegister();
    });

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });
});
