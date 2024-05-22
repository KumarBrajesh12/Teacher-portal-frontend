import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addStudent } from '../features/studentSlice';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SubjectIcon from '@mui/icons-material/Subject';
import GradeIcon from '@mui/icons-material/Grade';

const StudentForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(addStudent({ name, subject, marks }));
    setOpen(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        Add Student  <AddCircleOutlineIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SubjectIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Marks"
            type="number"
            fullWidth
            margin="normal"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GradeIcon />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} startIcon={<CancelIcon />} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} startIcon={<CheckCircleOutlineIcon />} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentForm;
