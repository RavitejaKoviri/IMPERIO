import axios from 'axios';

export const postInvoiceData = async (data) => {
//   console.log(data);
    return await axios.post('/api/invoiceData', data );
};

export const getInvoiceData = async (data) => {
    //   console.log(data);
        return await axios.get('/api/invoiceData');
    };