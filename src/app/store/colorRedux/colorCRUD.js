import axios from 'axios';

export const postColorData = async (data) => {
//   console.log(data);
    return await axios.post('/api/colors', data );
};

export const getColorData = async () => {
    //   console.log(data);
        return await axios.get('/api/colors');
    };