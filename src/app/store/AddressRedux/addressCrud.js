import axios from 'axios';

export const postAddressDetails = async (data) => {
  console.log("present data" , data);
  try {
    const response = await axios.post('/api/Address', data);
    console.log("response",response)
    return response;
  } catch (error) {
    console.error('Error posting address details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAddressDetails = async (id) => {
  console.log("crud id",id)
  try {
    const response = await axios.get(`/api/Address?key=${id.id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error getting address details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteAddressDetails = async (id) => {
  try {
    const response = await axios.delete('/api/Address', { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting address details:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const updateAddressDetails = async (data) => {
  try {
    const response = await axios.put('/api/Address', data);
    return response.data;
  } catch (error) {
    console.error('Error updating address details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

