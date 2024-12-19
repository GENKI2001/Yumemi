import userReducer, { registerUser } from './../userSlice';

describe('userSlice', () => {
  const initialState = {
    email: 'test@example.com',
    password: 'password',
  };

  it('should return the initial state when passed an empty action', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle registerUser action', () => {
    const payload = { email: 'test2@example.com', password: 'password123' };
    const action = registerUser(payload);

    const result = userReducer(initialState, action);

    expect(result.email).toBe(payload.email);
    expect(result.password).toBe(payload.password);
  });

  it('should override state when registerUser is called multiple times', () => {
    const initial = { email: 'old@example.com', password: 'oldpassword' };
    const newPayload = { email: 'new@example.com', password: 'newpassword' };
    const action = registerUser(newPayload);

    const result = userReducer(initial, action);

    expect(result.email).toBe(newPayload.email);
    expect(result.password).toBe(newPayload.password);
  });
});
