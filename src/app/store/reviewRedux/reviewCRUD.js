import axios from 'axios';

export const postReviewDetails = async (data) => {
  try {
    const response = await axios.post('/api/reviews', data);
    return response.data;
  } catch (error) {
    console.error('Error posting reviews details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getReviewDetails = async (productidKey) => {
  try {
    console.log(productidKey,"key");
    const response = await axios.get(`/api/reviews?${productidKey}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting reviews details:', error.response ? error.response.data : error.message);
    throw error;
  }
};


