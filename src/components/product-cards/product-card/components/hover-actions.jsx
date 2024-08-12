import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"; // STYLED COMPONENTS
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWishlist } from "app/store/wishlistRedux/wishlistActions";
import { useRouter } from "next/navigation";
import { HoverIconWrapper } from "../styles";
import { useEffect,useState} from "react";
// ==============================================================

export default function HoverActions({
  productId,
  isFavorite,
  toggleFavorite,
  toggleView
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state) => state.user.userid);
  const userValid = useSelector((state) => state.user.loginVerified);
  const wishlist = useSelector(state => state.wishlist.wishlistData);
  const [wishlistdata,setWishlistdata]=useState([])
  
useEffect(()=>{
  console.log("userId", userId);
  console.log("productId", productId);
  console.log("isFavorite", isFavorite);
},[wishlist])
 

  // const handleFavorite = (productId, userId) => {
  //   if (userValid) {
  //     const data = { productId, userId };
  //     console.log("Details", data);
  //     console.log("is favorite",isFavorite)
  //     if(!isFavorite)
  //     {
  //       console.log("handle favorite")
  //     dispatch(addProductToWishlist(data));
  //     }
  //   } else {
  //     router.push("/login");
  //   }
  // };

  const handleClick=(productId, userId)=>{
    console.log("wislist hhi")
    if(!isFavorite)
    {
      console.log("fav is false")
      if (userValid) {
        const data = { productId, userId };
        console.log("Details", data);
        console.log("is favorite",isFavorite)
        dispatch(addProductToWishlist(data));
        }
        else {
          router.push("/login");
        }
      }
      else
      {
        console.log("fav is true")

        if (userValid) {
          console.log("hello");
          console.log(productId);
          console.log("is favorite1",isFavorite)
          dispatch(removeProductFromWishlist(productId, userId));
        } else {
          router.push("/login");
        }
      } 
    }

  // const handleDelete = async (productId) => {
  //   if (userValid) {
  //     console.log("hello");
  //     console.log(productId);
  //     console.log("is favorite1",isFavorite)
  //     if(isFavorite)
  //     {
  //       console.log("handle delete")
  //     dispatch(removeProductFromWishlist(productId, userId));
  //     }
  //   } else {
  //     router.push("/login");
  //   }
  // };

  return (
    <HoverIconWrapper className="hover-box">
      <IconButton onClick={toggleView}>
        <RemoveRedEye color="disabled" fontSize="small" />
      </IconButton>

      <IconButton onClick={() => { handleClick(productId, userId);toggleFavorite(); }}>
        {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      </IconButton>
    </HoverIconWrapper>
  );
}
