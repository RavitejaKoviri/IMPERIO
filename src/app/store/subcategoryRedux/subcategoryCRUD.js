import axios from "axios";

export const postSubcategoryDetails = async (data) => {
  try {
    const response = await axios.post("/api/subcategory", data);
    return response.data;
  } catch (error) {
    console.error(
      "Error posting subcategories details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getSubcategoryDetails = async (params) => {
  try {
    const response = await axios.get("/api/subcategory?key=subcategories", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error getting subcategories details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const putSubcategoryDetails = async (data) => {
  try {
    const response = await axios.put(
      "/api/subcategory?key=subcategories",
      data
    );
    // console.log("in crud",response);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating subcategories details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteSubcategoryDetails = async (data) => {
  try {
    console.log("cruddata", data);
    const response = await axios.delete("/api/subcategory", { data });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting subcategory details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
