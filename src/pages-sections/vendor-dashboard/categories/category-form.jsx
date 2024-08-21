"use client"
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postCategory } from "app/store/categoryRedux/categoryAction";

// imports required for category CRUD
import { postCategoryFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required")
});

const CategoryForm = (props) => {
  const dispatch = useDispatch();
  const { initialValues } = props;
  // getting post data message from state -$sam
  const postVendorCategoryMessage=useSelector((state)=> state.vendorCategory.categoryPostMessage);
  const [postMessage,setPostMessage]=useState("");
  const [postCounter,setPostCounter]=useState(0);
  
  // To show Message dialog box dynamically -$sam
  useEffect(()=>{
    // dispatch(postVendorCategory)
    setPostMessage(postVendorCategoryMessage);
    if(postCounter==0)
          document.getElementById("category").style.display='none';
    else 
      document.getElementById("category").style.display='block';
  },[postVendorCategoryMessage,postCounter])
  

  // To close dialog Box to throw message  - $sam
  const removePostMessage=()=>{ 
    setPostCounter(0);
    document.getElementById("category").style.display='none';
    setPostMessage("");
  }

  const containerStyle = {
    position: 'fixed',
    top: '43%',
    right: '35%',
    width: '250px',
    zIndex: 1200, // Ensure it appears above other content
  };
  
  const messageBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0e98e8', // Light red background for warning
    color: 'white', // Dark red text color for contrast
    padding: '16px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    position: 'relative',
  };
  
  const messageTextStyle = {
    flex: 1,
    fontWeight: 500,
  };
  
  const messageCloseStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white', // Match the text color
    cursor: 'pointer',
    position: 'absolute',
    top: '16px',
    right: '16px',
  };

  
  return (
    <Card sx={{ p: 6 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        // submitting form on succesfull form filling 
        onSubmit={async (values, { setSubmitting,resetForm }) => { 
          // dispatching post event to vendor/Category/categoryAction.js
          const categoryData={
            categoryName : values.name,
            // categoryStatus : values.parent
          }//setting json object to post data 
          dispatch(postCategoryFromVendor(categoryData));
          values.name="";
          // values.status="";
          setPostCounter(1);
          
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                {/* Text Feild for Category Name */}
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Category Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              {/* Choosing status from drop down */}
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="parent"
                  onBlur={handleBlur}
                  value={values.parent}
                  onChange={handleChange}
                  placeholder="Status"
                  label="Status"
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">InActive</MenuItem>
                </TextField>
              </Grid> */}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save  category
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <div className="container" id="category" >
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
          <div style={containerStyle}>
            <div style={messageBoxStyle}>
              <span style={messageTextStyle}>
                {postMessage}
              </span>
              <span style={messageCloseStyle} onClick={removePostMessage}>
                &times;
              </span>
            </div>
          </div>

          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryForm;