"use client";

import { useState, Fragment,useEffect } from "react";
import Place from "@mui/icons-material/Place"; // Local CUSTOM COMPONENT

import Pagination from "../../pagination";
import AddressListItem from "../address-item";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "app/store/AddressRedux/addressAction";
import { Grid } from "@mui/material";

// =======================================================
export default function AddressPageView() 
{
  const [allAddress, setAllAddress] = useState([]);
  const maindata=useSelector(state=>state.address.addressDetails);
  const dispatch = useDispatch();
  const userValid=useSelector((state)=>state.user.loginVerified);
  const userid=useSelector((state)=>state.user.userid);

  useEffect(()=>{
    // console.log("tahrun");
    // console.log("uid",userid)
    const id={
      id:userid
    }
      dispatch(getAddress(id));
    },[])

    useEffect(()=>{
      setAllAddress(maindata)
    },[maindata])


  return <Fragment>
      {
      /* TITLE HEADER AREA */
    }
      <DashboardHeader Icon={Place} href="/address/New-address" title="My Addresses" buttonText="Add New Address" />

      {
      /* ALL ADDRESS LIST AREA */
    }
      {/* {allAddress.map(address => <AddressListItem key={address.id} address={address} handleDelete={handleAddressDelete} />)} */}
      <Grid container spacing={2}>
        {allAddress.map(address => (
          <AddressListItem
            key={address.id}
            address={address}
          />
        ))}
      </Grid>
         
      {
      /* PAGINATION AREA */
    }
      <Pagination count={5} onChange={data => console.log(data)} />
    </Fragment>;
}