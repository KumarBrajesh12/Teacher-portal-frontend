import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { login } from '../features/authSlice';
import { TextField, Button, Typography, Container, CircularProgress, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Teacher Portal Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
