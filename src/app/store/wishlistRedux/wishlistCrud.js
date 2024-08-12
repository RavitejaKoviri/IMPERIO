import axios from "axios";

export const addProduct = (data) => {
  console.log("in crud ", data);
  return axios.post("/api/wishlist", data);
};

export const getProduct = (userId) => {
  console.log("hup", userId);
  return axios.get(`/api/wishlist?${userId}`);
};

export const removeProduct = (productId,userId) => {
  console.log("crud product id", productId);
  console.log("crud user id", userId);
  return axios.delete(`/api/wishlist?${productId}?${userId}`);
};
