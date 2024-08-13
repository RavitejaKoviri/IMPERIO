"use client";

import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup"; // LOCAL CUSTOM COMPONENTS
import 'bootstrap/dist/css/bootstrap.min.css';
import EyeToggleButton from "../components/eye-toggle-button"; // LOCAL CUSTOM HOOK

import usePasswordVisible from "../use-password-visible"; // GLOBAL CUSTOM COMPONENTS

import BazaarTextField from "components/BazaarTextField"; // ==============================================================
import { useDispatch } from "react-redux";
import { use } from "i18next"; 
import { adminLogin } from "app/store/adminRedux/adminLoginAction";
// ==============================================================




const LoginPageView = ({
  closeDialog
}) => {
  const dispatch =useDispatch();
  const {
    visiblePassword,
    togglePasswordVisible
  } = usePasswordVisible(); // LOGIN FORM FIELDS INITIAL VALUES

  const initialValues = {
    email: "",
    password: ""
  }; // LOGIN FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("invalid email").required("Email is required")
  });


  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    // handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    // onSubmit: values => {
    //   closeDialog?.();
    // }
  });
  const handleAdminSubmit=(e)=>{
    e.preventDefault();
    // const adminDetails={
    //   email:values.email,
    //   password:values.password
    // }
    dispatch(adminLogin(values));
  }
  return (
    <>
      <div className="container " style={{marginTop:'13%'}}>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-4 rounded" style={{border:'1px solid transparent',boxShadow:' 0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <div className="row text-center mb-3 " style={{color:'black'}}>
            <h5>Admin Login</h5>
          </div> 
          <form onSubmit={handleAdminSubmit}>
          <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email or Phone Number" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />

          <BazaarTextField mb={2} fullWidth size="small" name="password" label="Password" autoComplete="on" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder="*********" type={visiblePassword ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
          endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
           }} />

          <Button fullWidth type="submit" color="primary" variant="contained" size="large">
            Login
          </Button>
          </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );

};

export default LoginPageView;