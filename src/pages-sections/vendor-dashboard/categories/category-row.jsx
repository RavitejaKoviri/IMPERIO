"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS
import TextField from "@mui/material/TextField";
import MenuItem, { IconButton, Snackbar } from "@mui/material";
import Grid from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT
import { Modal, Box, Typography, Button } from "@mui/material"; 
import BazaarSwitch from "components/BazaarSwitch"; // STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { deleteCategoryById, getCategoriesFromVendor, updateCategoryById } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
// ========================================================================
const CategoryRow = (props) => {
  const dispatch=useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // use state for holding update feilds for category -$SAM
  const [editData,setEditData] = useState();
  const [editStatus,setEditStatus] =useState();
  const [EditCategoryId,setEditCategoryId]=useState(props.id);

  // getting post data message from state -$sam
  const updateVendorCategoryMessage=useSelector((state)=> state.vendorCategory.categoryUpdateMessage);
  const [updateMessage,setUpdateMessage]=useState("");
  const [updateCounter,setUpdateCounter]=useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deletedCategory, setDeletedCategory] = useState(null);

  
  
  // To show Message dialog box dynamically -$sam
  // useEffect(()=>{
  //   // dispatch(postVendorCategory)
  //   console.log(updateVendorCategoryMessage,"state update message")
  //   setUpdateMessage(updateVendorCategoryMessage);
  //   console.log(updateCounter,"countervalue");
  //   if(updateCounter==0)
  //         document.getElementById("category").style.display='none';
  //   else 
  //     document.getElementById("category").style.display='block';
  // },[updateVendorCategoryMessage,updateCounter])
 

  // To close dialog Box to throw message  - $sam
  const removePostMessage=()=>{ 
    
    setUpdateCounter(0);
    document.getElementById("category").style.display='none';
    setUpdateMessage("");
    setTimeout(() => {
      dispatch(getCategoriesFromVendor());
  }, 1000); 
  }


  
  // const hasSelected = selected.indexOf(name) !== -1;
  const handleDelete = async () => {
    const categoryToDelete = {
      id: EditCategoryId,
      name: props.category // Assuming you have the category name in props
    };
    setDeletedCategory(categoryToDelete);
    
    try {
      await dispatch(deleteCategoryById({ id: EditCategoryId }));
      setSnackbarMessage(`Category ${categoryToDelete.name} deleted`);
      setSnackbarOpen(true);
      setUpdateCounter(1);
    } catch (error) {
      setSnackbarMessage('Error deleting category');
      setSnackbarOpen(true);
    }
  };
  
  const handleView = () => {
    setIsModalOpen(true); // Open modal on view button click
  }

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  }

  const handleEdit = () => {
    setEditModalOpen(true); // Open modal on view button click
  }

  const handleEditModalClose = async () => {
    const updateCategory={
      id:EditCategoryId,
      name:editData,
      // status:editStatus,
    }
    dispatch(updateCategoryById(updateCategory));
    setUpdateCounter(1);
    setEditModalOpen(false); // Close modal
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };
  
 
  return <>
  {/* <div className="container " id="category" style={{display:'none',position:'absolute',marginTop:'0%',marginLeft:'30%'}}>
        <div className="row">
          <div className="col-md-2 "></div>
          <div className="col-md-3">
            <div className="row text-center" style={{backgroundColor:'blue',color:'white',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius:'5%'}}>
              <div className="col-md-10" >
                {updateMessage}
              </div>
              <div className="col-md-2">
                <h6 onClick={removePostMessage} style={{cursor: 'pointer'}}>x</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
  </div> */}
  <StyledTableRow tabIndex={-1} role="checkbox" >
     
      <StyledTableCell align="left">
        {props.category}
      </StyledTableCell>

      <StyledTableCell align="left">
        {props.status}
      </StyledTableCell>
      

      <StyledTableCell align="left">
        <StyledIconButton onClick={handleEdit} >
          <Edit />
        </StyledIconButton>

        {/* <StyledIconButton onClick={hand leView}>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton>
          <Delete onClick={handleDelete} />
        </StyledIconButton>



        {/* <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="view-modal-title"
          aria-describedby="view-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography id="view-modal-title" variant="h6" component="h2">
              Category Details
            </Typography>
            <Typography id="view-modal-description" sx={{ mt: 2 }}>
              {/* Render category details here */}
              {/* Category Name: {name} <br/>
              Added Time: {time} <br/>
              Added Date: {date} <br/>
              Added Day: {day} <br/> */}
              {/* Add more details as needed */}
           {/* </Typography>
            <Button onClick={handleModalClose}>Close</Button>
          </Box>
        </Modal> */}

        <Modal
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          aria-labelledby="view-modal-title"
          aria-describedby="view-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography id="view-modal-title" variant="h6" component="h2">
              Edit Category Details
            </Typography>
            <Typography id="view-modal-description" sx={{ mt: 2, mb:2 }}>
              {/* Render category details here */}
               <TextField fullWidth  name="name" label="Name"color="info" size="medium" placeholder="Name" onChange={(e) =>setEditData(e.target.value)} />
               {/* <TextField fullWidth  name="status" label="status"color="info" size="medium" placeholder="status " onChange={(e) =>setEditStatus(e.target.value)} /> */}
               <TextField fullWidth  name="status" label="status"color="info" size="medium" placeholder="id" value={props.id} hidden />

               
                {/* <TextField  select fullWidth name="Status"
                  color="info"
                  size="medium"
                  placeholder="Status"
                  label="Status"
                  SelectProps={{
                    multiple: false,
                  }} >
                     <MenuItem value="Active" >Active</MenuItem>
                     <MenuItem value="Inactive">Inactive</MenuItem>
                  </TextField> */}

              {/* <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="parent"
                  placeholder="Status"
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField> */}
    
              {/* Add more details as needed */}
            </Typography>
            <Button onClick={handleEditModalClose}>Submit</Button>
          </Box>
        </Modal>

        <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  sx={{
    '& .MuiSnackbarContent-root': {
      backgroundColor: '#f3722c', // Light red background
      color: 'white', // Black text
    }
  }}
  message={
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <DeleteIcon sx={{ marginRight: 1 }} />
      <Typography variant="body2">{snackbarMessage}</Typography>
    </Box>
  }
  action={
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  }
/>

      </StyledTableCell>
      </StyledTableRow>
      
    </>
};

export default CategoryRow;