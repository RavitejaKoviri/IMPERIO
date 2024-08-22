'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch"; // STYLED COMPONENTS

import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; // ========================================================================
import { useDispatch, useSelector } from "react-redux";
import { deleteSizeData } from "app/store/sizeRedux/sizeSlice";
import { deleteSize } from "app/store/sizeRedux/sizeAction";

// ========================================================================
const SizeRow = ({ sizeData }) => {
  const [sizeDataa,setSizeDataa] = useState(sizeData);
  useEffect(()=>{
    console.log("reload");
  },[sizeData])
  // const {
  //   name,
  //   featured,
  //   logo,
  //   id,
  //   slug
  // } = size || {};
  console.log(sizeData);
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector(state=> state.user.sizeDetails);
  // console.log("vijit",id);
  // const [featuredCategory, setFeaturedCategory] = useState(featured);
  // const hasSelected = selected.indexOf(name) !== -1;
  // console.log(id);
  const handleNavigate = () => router.push(`/admin/sizes/${slug}`);
  const handleSubmit = () => {
    // console.log(sizeData.sizeid);  
    dispatch(deleteSize(sizeData.sizeid));
  }

  return <StyledTableRow tabIndex={-1} role="checkbox" >
      <StyledTableCell align="center">{sizeData.sizeid}</StyledTableCell>

      <StyledTableCell align="center">{sizeData.sizename.charAt(0).toUpperCase()+sizeData.sizename.slice(1)}</StyledTableCell>

      {/* <StyledTableCell align="center">
        <Avatar alt={name}  sx={{
        width: 55,
        height: "auto",
        margin: "auto",
        borderRadius: 0
      }} />
      </StyledTableCell> */}

      <StyledTableCell align="center">
        {/* <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} /> */}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton onClick={handleSubmit}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default SizeRow;