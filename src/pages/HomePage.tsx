import React from 'react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import { Container, Typography, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" gutterBottom>
          Student List
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <StudentForm />
      <StudentList />
    </Container>
  );
};

export default HomePage;
