import authReducer, { AuthState, login, logout } from './../authSlice';

describe('authSlice reducer', () => {
  const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
  };

  it('should return the initial state when no action is provided', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle login when not logged in', () => {
    const action = login('test-token');
    const expectedState: AuthState = {
      isLoggedIn: true,
      token: 'test-token',
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should not change state when login is called while already logged in', () => {
    const loggedInState: AuthState = {
      isLoggedIn: true,
      token: 'existing-token',
    };
    const action = login('new-token');

    expect(authReducer(loggedInState, action)).toEqual(loggedInState);
  });

  it('should handle logout when logged in', () => {
    const loggedInState: AuthState = {
      isLoggedIn: true,
      token: 'test-token',
    };
    const action = logout();
    const expectedState: AuthState = {
      isLoggedIn: false,
      token: null,
    };

    expect(authReducer(loggedInState, action)).toEqual(expectedState);
  });

  it('should not change state when logout is called while already logged out', () => {
    const action = logout();

    expect(authReducer(initialState, action)).toEqual(initialState);
  });
});
