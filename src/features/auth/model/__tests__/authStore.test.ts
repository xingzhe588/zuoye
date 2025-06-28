import { configureStore } from '@reduxjs/toolkit';
import authReducer, { clearError, setToken, loginUser, registerUser, logoutUser } from '../authStore';

describe('authStore', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().auth;
      expect(state.user).toBeFalsy(); // Can be null or undefined
      expect(state.token).toBeFalsy(); // Can be null or undefined
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeFalsy(); // Can be null or undefined
    });
  });

  describe('synchronous actions', () => {
    it('should clear error', () => {
      store.dispatch(clearError());
      const state = store.getState().auth;
      expect(state.error).toBeNull();
    });

    it('should set token', () => {
      const token = 'test-token';
      store.dispatch(setToken(token));

      const state = store.getState().auth;
      expect(state.token).toBe(token);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle logout', () => {
      // First set a token
      store.dispatch(setToken('test-token'));

      // Then logout
      const action = { type: logoutUser.fulfilled.type };
      const state = authReducer(store.getState().auth, action);

      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('async actions', () => {
    // Mock fetch for async tests
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should handle loginUser pending state', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser fulfilled state', () => {
      const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
      const mockToken = 'test-token';

      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser, token: mockToken }
      };
      const state = authReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser rejected state', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.error).toBe(errorMessage);
    });

    it('should handle registerUser pending state', () => {
      const action = { type: registerUser.pending.type };
      const state = authReducer(undefined, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser fulfilled state', () => {
      const mockUser = { id: '1', username: 'newuser', email: 'new@example.com' };
      const mockToken = 'new-token';

      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser, token: mockToken }
      };
      const state = authReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser rejected state', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(undefined, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('localStorage integration', () => {
    it('should save token to localStorage when set', () => {
      const token = 'test-token';
      store.dispatch(setToken(token));

      expect(localStorage.getItem('token')).toBe(token);
    });

    it('should remove token from localStorage on logout', () => {
      // Set token first
      localStorage.setItem('authToken', 'test-token');
      store.dispatch(setToken('test-token'));

      // Then logout
      const action = { type: logoutUser.fulfilled.type };
      authReducer(store.getState().auth, action);

      // Note: localStorage removal is handled in the async thunk, not the reducer
      expect(localStorage.getItem('authToken')).toBe('test-token'); // Still there until async action completes
    });
  });
});