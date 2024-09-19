import React, { useEffect,useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "app/store/AddressRedux/addressAction";
import { update } from "lodash";


export default function EditAddressForm({ address, handleClose }) {
  const userid = useSelector((state) => state.user.userid); 
  const [id, setId] = useState(userid);
  const dispatch = useDispatch();
  useEffect(() => {
    setId(userid);
  }, [userid]);

  const INITIAL_VALUES = {
    id: address.id,
    user_id:userid,
    name: address.name || "",
    street: address.street || "",
    city: address.city || "",
    statename: address.statename || "",
    pincode: address.pincode || "",
    country: address.country || "",
    mobilenumber: address.mobilenumber || "",
  };

  // const VALIDATION_SCHEMA = yup.object().shape({
  //   name: yup.string().required("Name is required"),
  //   street: yup.string().required("Street is required"),
  //   city: yup.string().required("City is required"),
  //   statename: yup.string().required("State is required"),
  //   pincode: yup.string().required("Pincode is required"),
  //   country: yup.string().required("Country is required"),
  //   mobilenumber: yup.string().required("Mobile number is required"),
  // });

  const VALIDATION_SCHEMA = yup.object({
    street2: yup.string(),
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
      .required("required"),
    address1: yup.string().required("required"),
    contact: yup.number().required("required"),
    city: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
      .required("required"),
    state: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
      .required("required"),
    country: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
      .required("required"),
    pincode: yup.number().required("required")
  });
  // const userid = useSelector((state) => state.user.userid);
  // const [id, setId] = useState(userid);
  // useEffect(() => {
  //   setId(userid);
  // }, [userid]);
  const handleSubmit =(values, { setSubmitting }) => {
    try {
      dispatch(updateAddress(values));
      handleClose();
  
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTextOnly = (e, handleChange, field) => {
    const re = /^[a-zA-Z\s]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      handleChange(e);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={values.name}
                onBlur={handleBlur}
                onChange={(e) => handleTextOnly(e, handleChange, 'name')}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="street"
                label="Street"
                value={values.street}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.street && errors.street}
                helperText={touched.street && errors.street}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={values.city}
                onBlur={handleBlur}
                onChange={(e) => handleTextOnly(e, handleChange, 'city')}
                error={touched.city && errors.city}
                helperText={touched.city && errors.city}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="statename"
                label="State"
                value={values.statename}
                onBlur={handleBlur}
                onChange={(e) => handleTextOnly(e, handleChange, 'state')}
                error={touched.statename && errors.statename}
                helperText={touched.statename && errors.statename}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="pincode"
                label="Pincode"
                type="number"
                value={values.pincode}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.pincode && errors.pincode}
                helperText={touched.pincode && errors.pincode}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="country"
                label="Country"
                value={values.country}
                onBlur={handleBlur}
                onChange={(e) => handleTextOnly(e, handleChange, 'country')}
                error={touched.country && errors.country}
                helperText={touched.country && errors.country}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="mobilenumber"
                label="Mobile Number"
                type="number"
                value={values.mobilenumber}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.mobilenumber && errors.mobilenumber}
                helperText={touched.mobilenumber && errors.mobilenumber}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}