import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from './features/authSlice';
import studentReducer from './features/studentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
  },
});

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: 'auth/login/fulfilled', payload: { token } });
} else {
  store.dispatch(logout());
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
