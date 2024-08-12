import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================
import { useDispatch } from "react-redux";
import { deleteProductById } from "app/store/vendorRedux/ProductRedux/productAction";

// ========================================================================
const ProductRow = ({
  productid,category,categoryid,name,price,subcategory,subcategoryid,status,slug
}) => {
  const router = useRouter();
  const dispatch=useDispatch();
  const handleClickDelete=()=>{
    dispatch(deleteProductById(productid))
  }

  console.log("name",name,"category",category,"subcategory",subcategory,"price",price)

  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        {name}
      </StyledTableCell>
      <StyledTableCell align="left">
        {category}
      </StyledTableCell>

      <StyledTableCell align="left">
        {subcategory}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>


      <StyledTableCell align="left">
        <StyledIconButton onClick={() => router.push(`/admin/products/${slug}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={handleClickDelete}/>
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default ProductRow;