import React, { useState, useEffect } from "react";
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
import { getCategory } from "app/store/categoryRedux/categoryAction";
import { postSubcategory } from "app/store/subcategoryRedux/subcategoryAction";
import { getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import { postSubCategoryFromVendor } from "app/store/vendorRedux/SubCategroyRedux/subCategoryAciton";

const VALIDATION_SCHEMA = yup.object().shape({
  subCategoryName: yup.string().required("Name required"),
  status: yup.string().required("Status required"),
  parent: yup.string().required("Parent category required"),
});

const SubCategoryForm = ({
  initialValues = { subCategoryName: '', status: '', parent: '' }
}) => {
  const [parentFilled, setParentFilled] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const postVendorSubCategoryMessage = useSelector((state) => state.vendorSubCategory.subcategoryPostMessage);
  const [postMessage, setPostMessage] = useState("");
  const [postCounter, setPostCounter] = useState(0);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const [subCategoryAlreadyExist, setSubCategoryAlreadyExist] = useState(false);
  const getCategoriesState = useSelector((state) => state.vendorCategory.categoryList);
  const [subcategoryData, setSubcategoryData] = useState({
    categoryId: "",
    subCategoryName: "",
    subCategoryStatus: ""
  });

  useEffect(() => {
    dispatch(getCategoriesFromVendor());
  }, [dispatch]);

  const getCategoryId = (value) => {
    setSubcategoryData((prevData) => ({
      ...prevData,
      categoryId: value
    }));
    setParentFilled(true);
  };

  useEffect(() => {
    setPostMessage(postVendorSubCategoryMessage);
    if (postCounter === 0) {
      document.getElementById("subcategory").style.display = 'none';
    } else {
      document.getElementById("subcategory").style.display = 'block';
    }
  }, [postVendorSubCategoryMessage, postCounter]);

  const removePostMessage = () => {
    setPostCounter(0);
    document.getElementById("subcategory").style.display = 'none';
    setPostMessage("");
  };


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
        onSubmit={(values) => {
          const subCategoryData = {
            categoryId: values.parent,
            subcategoryName: values.subCategoryName,
            subcategoryStatus: values.status
          }
          dispatch(postSubCategoryFromVendor(subCategoryData));
          values.subCategoryName = "";
          values.status = "";
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
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="parent"
                  onChange={(e) => {
                    handleChange(e);
                    getCategoryId(e.target.value);
                  }}
                  placeholder="Parent Category"
                  value={values.parent}
                  label="Select Parent Category"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                >
                  {getCategoriesState.map((category) => (
                    <MenuItem
                      key={category.categoryid}
                      value={category.categoryid}
                    >
                      {category.categoryname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="subCategoryName"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.subCategoryName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!parentFilled}
                />
                {subCategoryAlreadyExist && <p style={{ color: "maroon", marginLeft: "15px", fontSize: "12px", marginTop: "5px", marginBottom: "5px" }}> "Sub Category Name Already Taken"</p>}
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="status"
                  onChange={handleChange}
                  value={values.status}
                  placeholder="Status"
                  label="Select Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"

                >
                  Save subcategory
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <div className="container" id="subcategory" >
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

export default SubCategoryForm;
