"use client";

import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite"; // LOCAL CUSTOM HOOK

import useWishList from "./use-wish-list"; // GLOBAL CUSTOM COMPONENT

import ProductCard1 from "components/product-cards/product-card-1"; // CUSTOM DATA MODEL
import ProductCard from "components/product-cards/product-card/product-card";

// Local CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header"; // ==================================================================
import { useDispatch, useSelector } from "react-redux";
import { clearWishlistData, getProductInWishlist } from "app/store/wishlistRedux/wishlistActions";

// ==================================================================
export default function WishListPageView() {
  const dispatch = useDispatch();
  const userValid=useSelector((state)=>state.user.loginVerified)
  const userId = useSelector((state) => state.user.userid);
  const products = useSelector((state) => state.wishlist.wishlistData);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    setWishlistProducts(products);
  }, [products]);

  useEffect(()=>{
    if(!userValid){
    dispatch(clearWishlistData())
    }
  },[userValid])

  useEffect(()=>{
    dispatch(getProductInWishlist(userId))
  },[])

  console.log("wishlist", products);
  const { currentPage, handleChangePage } = useWishList();
  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {wishlistProducts.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
          <ProductCard id={item.productid} slug={item.productid} title={item.productname} currentprice={item.currentprice} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} originalPrice={item.originalprice} specs={item.specification} fav={true}/>
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <Pagination
        page={currentPage}
        count={Math.ceil(products / 6)}
        onChange={(_, page) => handleChangePage(page)}
      />
    </Fragment>
  );
}
