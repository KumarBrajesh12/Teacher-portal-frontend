import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Student {
  _id?: string;
  name: string;
  subject: string;
  marks: number;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

const baseURL = 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

export const fetchStudents = createAsyncThunk<Student[], void, { rejectValue: { message: string } }>(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${baseURL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data.message || 'Failed to fetch students' });
    }
  }
);

export const addStudent = createAsyncThunk<Student, Omit<Student, '_id'>, { rejectValue: { message: string } }>(
  'students/addStudent',
  async (student, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${baseURL}/api/students`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data.message || 'Failed to add student' });
    }
  }
);

export const deleteStudent = createAsyncThunk<string, string, { rejectValue: { message: string } }>(
  'students/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(`${baseURL}/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data.message || 'Failed to delete student' });
    }
  }
);

export const updateStudent = createAsyncThunk<Student, Student, { rejectValue: { message: string } }>(
  'students/updateStudent',
  async (student, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(`${baseURL}/api/students/${student._id}`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response.data.message || 'Failed to update student' });
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch students';
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add student';
      })
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<string>) => {
        state.students = state.students.filter(student => student._id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete student';
      })
      .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        const index = state.students.findIndex(student => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update student';
      });
  },
});

export default studentSlice.reducer;
