import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar"; 
import Delete from "@mui/icons-material/Delete"; 
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; 
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; 
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "app/store/reviewRedux/reviewAction";

const ReviewRow = (props) => {


  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/* <Avatar
            alt="product"
            src={productImage}
            sx={{ borderRadius: 2 }}
          /> */}
          <p  style={{color:'black'}}>
            {props.productReview.productname}
          </p>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">{props.user}</StyledTableCell>

      <StyledTableCell align="left">
        <Small>{props.productReview.reviewcomment}</Small>
      </StyledTableCell>
      {/* <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPublish}
          onChange={() => setProductPublish(state => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ReviewRow;
