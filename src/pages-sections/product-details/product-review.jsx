"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import ProductComment from "./product-comment";
import { FlexBox } from "components/flex-box";
import { H2, H5 } from "components/Typography";
import { useState, useEffect } from "react";

import Scrollbar from "components/scrollbar/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getReview, postReview } from "app/store/reviewRedux/reviewAction";
import { getProduct } from "app/store/vendorProductRedux/productAction";

export default function ProductReview(data) {
  console.log(data,"entry");
  const pro1 = data.data.specs.productid;
  console.log("final value",pro1);
  const initialValues = {
    rating: 0,
    comment: "",
    date: new Date().toISOString()
  };
const storedComments = data.review;
  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    comment: yup.string().required("required"),
  });

  const [commentList, setCommentList] = useState([]);
  const userid1 = useSelector(state=>state.user.userid);
  const username = useSelector(state =>state.user.username);
  
  const dispatch = useDispatch();

  // const storedComments= useSelector(state=>state.review.reviewDetails);
  console.log(storedComments,"sakhfd");

  // 


  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const newComment = {
        name: username,
        // imgUrl: "/assets/images/faces/6.png",
        id : userid1,
        rating: values.rating,
        comment: values.comment,
        proid:pro1,
        ...values,
      };
      console.log(newComment);
      const updatedCommentList = [...commentList, newComment];
      console.log(commentList);
      setCommentList(updatedCommentList);
      dispatch(postReview(mainvalues));
      resetForm();
    },
  });
  const mainvalues={
    name : username,
    id :userid1,
    rating :values.rating,
    comment : values.comment,
    proid : pro1
  }
  return (
    <div>
      <Box width="100%">
        <Grid container spacing={12} justifyContent="space-around">
          
          <Grid item md={6} xs={12} alignItems="center">

            <Box alignItems="center" overflow="scroll" sx={{
          "&::-webkit-scrollbar": { display: "none" },
        }} borderBottom="1px solid #e0e0e0" height="500px" mb={1}>
              {/* <Scrollbar> */}
                  {storedComments.map((item, ind) => 
                  (
                    <ProductComment {...item} key={ind} />
                  ))
                  }
              {/* </Scrollbar> */}
              
            </Box>
          </Grid>
          <Grid item md={6} xs={12} alignItems="center">
            <Box overflow="auto">
              <H2 fontWeight="600" mt={7} mb={2.5}>
                Write a Review for this product
              </H2>
              <form onSubmit={handleSubmit}>
                <Box mb={2.5}>
                  <FlexBox mb={1.5} gap={0.5}>
                    <H5 color="grey.700">Your Rating</H5>
                    <H5 color="error.main">*</H5>
                  </FlexBox>
                  <Rating
                    color="warn"
                    size="medium"
                    value={values.rating}
                    onChange={(_, value) => setFieldValue("rating", value)}
                  />
                </Box>
                <Box mb={3}>
                  <FlexBox mb={1.5} gap={0.5}>
                    <H5 color="grey.700">Your Review</H5>
                    <H5 color="error.main">*</H5>
                  </FlexBox>
                  <TextField
                    rows={8}
                    multiline
                    fullWidth
                    name="comment"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.comment}
                    onChange={handleChange}
                    placeholder="Write a review here..."
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                  />
                </Box>
                {userid1 != null && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!(dirty && isValid)}
                 
                >
                  Submit
                </Button>
              )}
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}