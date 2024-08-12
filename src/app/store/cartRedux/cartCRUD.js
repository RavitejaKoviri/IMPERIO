import axios from "axios";

export const addProduct = (data) => {
  console.log("in crud ", data);
  return axios.post("/api/cart", data);
};

export const getProduct = (userId) => {
  console.log("hup", userId);
  return axios.get(`/api/cart?${userId}`);
};

export const removeProduct = (productData) => {
  return axios.delete("/api/cart", { data: productData });
};
