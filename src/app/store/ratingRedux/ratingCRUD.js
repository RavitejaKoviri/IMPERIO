import axios from 'axios';

export const postRatingDetails = async (data) => {
  try {
    
    console.log("hello postn",data);
    const response = await axios.post(`/api/Rating?productId=${data.proid}&overalRating=${data.overallRating}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting ratings details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getRatingDetails = async (proid) => {
  console.log(proid,"in crud")
  try {
    const response = await axios.get(`/api/Rating?productid=${proid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting ratingss details:', error.response ? error.response.data : error.message);
    throw error;
  }
};


