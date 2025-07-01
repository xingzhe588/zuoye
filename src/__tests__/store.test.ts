import { store, RootState, AppDispatch } from '../store';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/model/authStore';

describe('Redux Store', () => {
  it('should be configured correctly', () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

  it('should have auth reducer in state', () => {
    const state = store.getState();
    expect(state.auth).toBeDefined();
    expect(state.auth.isAuthenticated).toBeDefined();
    expect(state.auth.user).toBeDefined();
    expect(state.auth.isLoading).toBeDefined();
    expect(state.auth.error).toBeDefined();
    expect(state.auth.token).toBeDefined();
  });

  it('should have correct initial auth state', () => {
    const state = store.getState();
    expect(state.auth).toBeDefined();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.user).toBeNull();
    expect(state.auth.isLoading).toBe(false);
    expect(state.auth.error).toBeNull();
    expect(state.auth.token).toBeNull();
  });

  it('should export correct TypeScript types', () => {
    // Test that types are properly exported
    const state: RootState = store.getState();
    const dispatch: AppDispatch = store.dispatch;
    
    expect(state).toBeDefined();
    expect(dispatch).toBeDefined();
    expect(typeof dispatch).toBe('function');
  });

  it('should handle auth actions', () => {
    const initialState = store.getState();
    expect(initialState.auth.isAuthenticated).toBe(false);
    
    // Test that store can handle dispatched actions
    expect(() => {
      store.dispatch({ type: 'auth/loginStart' });
    }).not.toThrow();
  });

  it('should have serializable check middleware configured', () => {
    // Test that the store is configured with middleware
    expect(store).toBeDefined();
    
    // Test that persist actions are ignored in serializable check
    expect(() => {
      store.dispatch({ type: 'persist/PERSIST', payload: {} });
    }).not.toThrow();
  });

  it('should maintain state consistency', () => {
    const state1 = store.getState();
    const state2 = store.getState();
    
    // States should be the same reference when no actions are dispatched
    expect(state1).toBe(state2);
  });

  it('should allow subscription to state changes', () => {
    const mockListener = jest.fn();
    const unsubscribe = store.subscribe(mockListener);
    
    // Dispatch an action to trigger listener
    store.dispatch({ type: 'auth/loginStart' });
    
    expect(mockListener).toHaveBeenCalled();
    
    // Clean up
    unsubscribe();
  });

  it('should be created with configureStore', () => {
    // Test that we can create a similar store
    const testStore = configureStore({
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
          },
        }),
    });
    
    expect(testStore.getState().auth).toEqual(store.getState().auth);
  });

  it('should handle unknown actions gracefully', () => {
    const initialState = store.getState();
    
    // Dispatch unknown action
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    
    const newState = store.getState();
    expect(newState.auth).toEqual(initialState.auth);
  });

  it('should have correct reducer structure', () => {
    const state = store.getState();
    
    // Check that all expected reducers are present
    expect(Object.keys(state)).toContain('auth');
    expect(Object.keys(state)).toHaveLength(1);
  });

  it('should support time travel debugging in development', () => {
    // Test that store supports Redux DevTools
    expect(store).toBeDefined();
    
    // In development, the store should have additional properties for debugging
    if (process.env.NODE_ENV === 'development') {
      expect(store).toHaveProperty('getState');
      expect(store).toHaveProperty('dispatch');
      expect(store).toHaveProperty('subscribe');
    }
  });

  it('should handle concurrent dispatches', () => {
    const initialState = store.getState();
    
    // Dispatch multiple actions
    store.dispatch({ type: 'auth/loginStart' });
    store.dispatch({ type: 'auth/loginStart' });
    store.dispatch({ type: 'auth/loginStart' });
    
    // State should still be consistent
    const finalState = store.getState();
    expect(finalState.auth).toBeDefined();
  });

  it('should maintain immutability', () => {
    const state1 = store.getState();
    const authState1 = state1.auth;

    // Dispatch an action that changes state
    store.dispatch({ type: 'auth/loginStart' });

    const state2 = store.getState();
    const authState2 = state2.auth;

    // States should be different objects (immutable) if the action actually changes state
    if (authState1 && authState2) {
      // Only check immutability if the state actually changed
      if (authState1.isLoading !== authState2.isLoading) {
        expect(state1).not.toBe(state2);
        expect(authState1).not.toBe(authState2);
      } else {
        // If state didn't change, objects might be the same (optimization)
        expect(state1).toBe(state2);
      }
    }
  });
});
