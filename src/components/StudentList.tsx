import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchStudents,
  deleteStudent,
  updateStudent,
} from "../features/studentSlice";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";

const StudentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector(
    (state: RootState) => state.students
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionOpenId, setActionOpenId] = useState<string | null>(null);
  const [editedStudent, setEditedStudent] = useState<{
    id: string;
    name: string;
    subject: string;
    marks: number;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (id) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEdit = (student: {
    id: string;
    name: string;
    subject: string;
    marks: number;
  }) => {
    setEditingId(student.id);
    setEditedStudent(student);
  };

  const handleSave = () => {
    if (editedStudent) {
      const { id, name, subject, marks } = editedStudent;
      const validMarks = Math.max(0, Math.min(marks, 100));
      dispatch(updateStudent({ _id: id, name, subject, marks: validMarks }));
      setEditingId(null);
      setEditedStudent(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (editedStudent) {
      setEditedStudent({ ...editedStudent, [field]: e.target.value });
    }
  };

  const handleMarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedStudent) {
      const marks = Number(e.target.value);
      if (marks >= 0 && marks <= 100) {
        setEditedStudent({ ...editedStudent, marks });
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Marks</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student._id}>
            <TableCell>
              {editingId === student._id ? (
                <TextField
                  value={editedStudent?.name || ""}
                  onChange={(e: any) => handleInputChange(e, "name")}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{ bgcolor: "blue", color: "white", marginRight: 1 }}
                  >
                    {student.name.charAt(0).toUpperCase()}
                  </Avatar>
                  {student.name}
                </div>
              )}
            </TableCell>
            <TableCell>
              {editingId === student._id ? (
                <TextField
                  value={editedStudent?.subject || ""}
                  onChange={(e: any) => handleInputChange(e, "subject")}
                />
              ) : (
                student.subject
              )}
            </TableCell>
            <TableCell>
              {editingId === student._id ? (
                <TextField
                  type="number"
                  value={editedStudent?.marks || ""}
                  onChange={handleMarksChange}
                  inputProps={{ min: 0, max: 100 }}
                />
              ) : (
                student.marks
              )}
            </TableCell>
            <TableCell>
              {actionOpenId === student._id ? (
                <Box>
                  <IconButton onClick={() => handleDelete(student._id!)}>
                    <DeleteIcon />
                  </IconButton>
                  {editingId === student._id ? (
                    <IconButton onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleEdit({
                          id: student._id!,
                          name: student.name,
                          subject: student.subject,
                          marks: student.marks,
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>
              ) : (
                <IconButton onClick={() => setActionOpenId(student._id!)}>
                  <MoreVertIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentList;
