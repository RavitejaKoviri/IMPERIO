import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch"; // STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubCategoryById, updateSubCategoryById } from "app/store/vendorRedux/SubCategroyRedux/subCategoryAciton";
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';



// ========================================================================
const SubCategoryRow = ({
  subcategoryid,
  subcategory,
  category,
  categoryid,
  selected,
  status
}) => {
  const router = useRouter();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData,setEditData] = useState();
  const dispatch = useDispatch();
  const updateVendorSubCategoryMessage=useSelector((state)=> state.vendorSubCategory.subcategoryUpdateMessage);
  const [updateMessage,setUpdateMessage]=useState("");
  const [updateCounter,setUpdateCounter]=useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [deletedSubCategory, setDeletedSubCategory] = useState(null);
  // const [featuredCategory, setFeaturedCategory] = useState(featured);
  // const hasSelected = selected.indexOf(name) !== -1;

  // const handleNavigate = () => router.push(`/admin/categories/${slug}`);

  // To show Message dialog box dynamically -$sam
  // useEffect(()=>{
  //   // dispatch(postVendorCategory)
  //   console.log(updateVendorSubCategoryMessage,"state update message")
  //   setUpdateMessage(updateVendorSubCategoryMessage);
  //   console.log(updateCounter,"countervalue");
  //   if(updateCounter==0)
  //         document.getElementById("category").style.display='none';
  //   else 
  //     document.getElementById("category").style.display='block';
  // },[updateVendorSubCategoryMessage,updateCounter])

   // To close dialog Box to throw message  - $sam
   const removePostMessage=()=>{ 
    
    setUpdateCounter(0);
    // console.log("deleted")
    document.getElementById("category").style.display='none';
    setUpdateMessage("");
    setTimeout(() => {
      dispatch(getCategoriesFromVendor());
  }, 1000); 
  }

  const handleEdit = () => {
    setEditModalOpen(true); // Open modal on view button click
  }

  const handleEditModalClose = async () => {
    const updateSubCategory={
      subcategoryid:subcategoryid,
      subcategoryname:editData,
      categoryKey: categoryid,
    }
    console.log("subdata", updateSubCategory);
    dispatch(updateSubCategoryById(updateSubCategory));
    setEditModalOpen(false);
    };

    const handleDelete = () => {
      const deleteSubCategory = {
        id: subcategoryid,
        parentid: categoryid
      };
      setDeletedSubCategory({ ...deleteSubCategory, name: subcategory });
      dispatch(deleteSubCategoryById(deleteSubCategory))
        .then(() => {
          setSnackbarMessage(`Subcategory ${subcategory} deleted`);
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setSnackbarMessage('Error deleting subcategory');
          setSnackbarOpen(true);
        });
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };
    


  return(
    <>
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
  <StyledTableRow tabIndex={-1} role="checkbox">
    <StyledTableCell align="left">{subcategory}</StyledTableCell>

    <StyledTableCell align="left">
      {category}
    </StyledTableCell>

    <StyledTableCell align="start">
      <StyledIconButton onClick={handleEdit}>
        <Edit />
      </StyledIconButton>

      <StyledIconButton  onClick={handleDelete} >
        <Delete />
      </StyledIconButton>

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
               <TextField fullWidth  name="name" label="SubCategory Name"color="info" size="medium" placeholder="Subcategory Name" onChange={(e) =>setEditData(e.target.value)} />
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
  );
};

export default SubCategoryRow;