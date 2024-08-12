"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT
import { useState,useEffect } from "react";
import CategoryRow from "../category-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================
import { useDispatch, useSelector } from "react-redux";
// getting categories action to get categories where states are active
import { getCategoriesFromVendor } from "app/store/vendorRedux/CategoryRedux/categoryAction";
import { TableCell, TableHead, TableRow } from "@mui/material";

// =============================================================================
const CategoriesPageView = () => {
  const dispatch=useDispatch();
  
  const getCategoriesState=useSelector((state)=>state.vendorCategory.categoryList);
  const [getCategories,setGetCategories]=useState(getCategoriesState);
  useEffect(()=>{
    dispatch(getCategoriesFromVendor());
    console.log("getCategories in main component",getCategoriesState);
  },[])
  
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    // listData: filteredCategories
  });

  

  return <Box py={4}>
      <H3 mb={2}> Categories</H3>

      <SearchArea handleSearch={() => {}} buttonText="Add Category" url="/admin/categories/create" searchPlaceholder="Search Category..." />

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
            <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

              <TableBody>
                {getCategoriesState.map(category => <CategoryRow id={category.categoryid} category={category.categoryname} selected={selected} status={category.status} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          {/* <TablePagination onChange={handleChangePage} count={Math.ceil(categories.length / rowsPerPage)} /> */}
        </Stack>
      </Card>
      
    </Box>;
};

export default CategoriesPageView;