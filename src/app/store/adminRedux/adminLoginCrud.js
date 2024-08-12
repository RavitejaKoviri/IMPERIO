import axios from 'axios';

export const adminLoginValidate = async (data) => {
//   console.log(data);
    return await axios.post('/api/Admin', data );
};
