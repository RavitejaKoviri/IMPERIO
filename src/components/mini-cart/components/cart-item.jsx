"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import { H6, Tiny } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL
import { useDispatch, useSelector } from "react-redux";

import { addProductToCart } from "app/store/UserCartRedux/UserCartAction";
import { useState,useEffect } from "react";

// ==============================================================
export default function MiniCartItem({
  item,
  handleCartAmountChange
}) {

  const userValid = useSelector((state) => state.user.loginVerified);
  const userId = useSelector((state) => state.user.userid);
  const [increment, setIncrement] = useState(Number(item.quantity));
  const dispatch = useDispatch();
  useEffect(() => {
    if (userValid) {
      const productData = {
        id:item.productid,
        userid: item.userid,
        qty: increment,
        remainingqty: item.remaining_qty,
      };
      dispatch(addProductToCart(productData));
    }
  }, [increment, userValid,  userId, dispatch]);

  // Handle incrementing the quantity
  const handleIncrementQuantity = () => {
    if (userValid) {
    setIncrement((prevIncrement) => (prevIncrement < item.remaining_qty? prevIncrement + 1 : item.remaining_qty));
    }
    else{
      router.push("/login");
    }
  };


  const handleDecrementQuantity = () => {
    if (userValid) {
    setIncrement((prevIncrement) => (prevIncrement > 0 ? prevIncrement - 1 : 0));
    }
    else{
      router.push("/login");
    }
  };





  const productBysub = useSelector(state => state.productBySubCategory.productsBasedOnSubcategories);


  // Find the product in productBysub based on productid
  const product = productBysub.find(product => product.productid === item.productid);

  // Use the found product name or fall back to a default name
  const productname = product ? product.productname : "Unknown Product";

  return (
    <FlexBox py={2} px={2.5} key={item.productid} alignItems="center" borderBottom="1px solid" borderColor="divider">
      <FlexBox alignItems="center" flexDirection="column">
        <Button size="small" color="primary" variant="outlined" onClick={() => handleIncrementQuantity()} sx={{
          height: 28,
          width: 28,
          borderRadius: 50
        }}>
          <Add fontSize="small" />
        </Button>

        <H6 my="3px">{item.quantity}</H6>

        <Button size="small" color="primary" variant="outlined" disabled={item.quantity === 1} onClick={() => handleDecrementQuantity()} sx={{
          height: 28,
          width: 28,
          borderRadius: 50
        }}>
          <Remove fontSize="small" />
        </Button>
      </FlexBox>

      <Link href={`/products/${item.productid}`}>
        <Avatar alt={productname} src="/assets/images/furniture-products/b-3.png" sx={{
          mx: 1,
          width: 75,
          height: 75
        }} />
      </Link>

      <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        <Link href={`/products/${item.productid}`}>
          <H6 ellipsis className="title">
            {productname}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {currency(item.selling_price)} x {item.quantity}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(item.quantity * item.selling_price)}
        </H6>
      </Box>

      <IconButton size="small" onClick={() => handleCartAmountChange(0, item)} sx={{
        marginLeft: 2.5
      }}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
