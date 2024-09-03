"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Snackbar, Box, Typography, IconButton, TextField, Button, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTableRow, StyledTableCell, StyledIconButton } from "../styles";
import { deleteCategoryById, updateCategoryById } from "app/store/vendorRedux/CategoryRedux/categoryAction";

const CategoryRow = ({id, category, status }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(category);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  
  console.log(category,"munda")

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategoryById({ id }));
      showSnackbar('delete', `Category deleted successfully`);
    } catch (error) {
      showSnackbar('error', 'Error deleting category');
    }
  };

  const handleEdit = () => setEditModalOpen(true);

  const handleEditSubmit = async () => {
    
    try {
      await dispatch(updateCategoryById({ id, name: editData }));
      showSnackbar('update', `Category updated successfully`);
      setEditModalOpen(false);
    } catch (error) {
      showSnackbar('error', 'Error updating category');
    }
  };

  const showSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const getSnackbarColor = (type) => {
    switch (type) {
      case 'update':
        return '#2196f3'; // Blue
      case 'delete':
        return '#ff9800'; // Light Red (Orange)
      case 'error':
        return '#f44336'; // Error Red
      default:
        return '#4caf50'; // Success Green
    }
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="left">{category}</StyledTableCell>
        <StyledTableCell align="left">{status}</StyledTableCell>
        <StyledTableCell align="left">
          <StyledIconButton onClick={handleEdit}>
            <EditIcon />
          </StyledIconButton>
          <StyledIconButton onClick={handleDelete}>
            <DeleteIcon />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>

      <Modal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-category-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
          <Typography id="edit-category-modal" variant="h6" component="h2" mb={2}>
            Edit Category
          </Typography>
          <TextField
            fullWidth
            label="Category Name"
            onChange={(e) => setEditData(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleEditSubmit} variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: getSnackbarColor(snackbarType),
          color: 'white',
          padding: '6px 16px',
          borderRadius: '4px',
          boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
        }}>
          {snackbarType === 'delete' ? (
            <DeleteIcon sx={{ marginRight: 1 }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
          )}
          <Typography variant="body2">{snackbarMessage}</Typography>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
            sx={{ marginLeft: 'auto' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Snackbar>
    </>
  );
};

export default CategoryRow;