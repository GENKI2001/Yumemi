import { act, renderHook } from '@testing-library/react';
import useLoginForm from '../useLoginForm';

describe('useLoginForm', () => {
  const mockReduxHandleLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the correct initial state', () => {
    const { result } = renderHook(() => useLoginForm(mockReduxHandleLogin));

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.emailError).toBeNull();
    expect(result.current.passwordError).toBeNull();
  });

  it('handles email and password change', () => {
    const { result } = renderHook(() => useLoginForm(mockReduxHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'example@gmail.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: 'password' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.email).toBe('example@gmail.com');
    expect(result.current.password).toBe('password');
  });

  it('successfully logs in with the correct email and password', () => {
    const { result } = renderHook(() => useLoginForm(mockReduxHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'example@gmail.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: 'password' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleEmailPassLogin();
    });

    expect(mockReduxHandleLogin).toHaveBeenCalledTimes(1);
    expect(result.current.emailError).toBeNull();
    expect(result.current.passwordError).toBeNull();
  });

  it('displays an error when the email or password is incorrect', () => {
    const { result } = renderHook(() => useLoginForm(mockReduxHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'wrong@gmail.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: 'wrongpassword' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleEmailPassLogin();
    });

    expect(mockReduxHandleLogin).not.toHaveBeenCalled();
    expect(result.current.emailError).not.toBeNull();
    expect(result.current.passwordError).not.toBeNull();
  });

  it('clears errors when inputs are changed', () => {
    const { result } = renderHook(() => useLoginForm(mockReduxHandleLogin));

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'wrong@gmail.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: 'wrongpassword' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleEmailPassLogin();
    });

    expect(result.current.emailError).not.toBeNull();
    expect(result.current.passwordError).not.toBeNull();

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'example@gmail.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handlePasswordChange({
        target: { value: 'password' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.emailError).toBeNull();
    expect(result.current.passwordError).toBeNull();
  });
});