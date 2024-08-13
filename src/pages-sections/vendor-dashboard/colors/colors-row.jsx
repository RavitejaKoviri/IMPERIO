import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch"; // STYLED COMPONENTS

import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; // ========================================================================
import { colors } from "@mui/material"; // ========================================================================
const ColorsRow = ({
  color,
  selected
}) => {
  const {
    name,
    featured,
    logo,
    id,
    slug
  } = color|| {};
  const router = useRouter();
  // const [featuredColor, setFeaturedColor] = useState(featured);
  const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/admin/colors/${slug}`);
  const handleDelete=async ()=>{
    try{
     const response=await fetch("/api/colors",{
       method:"DELETE",
       headers:{
         'Content-Type':'applications/json'
       },
       body:JSON.stringify({id})
     })
     if(response.ok){
       window.location.reload();
     }
  
    }catch(error){
     console.error("Error:",error)
    }
   }

  return <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
      <StyledTableCell align="center">{id}</StyledTableCell>

      <StyledTableCell align="center">{name}</StyledTableCell>

      <StyledTableCell align="center">

        <StyledIconButton >
          <Delete onClick={handleDelete}/>
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default ColorsRow;