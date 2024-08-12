import * as requestFromServer from './invoiceCRUD';
import { postInvoiceDetails,getInvoiceDetails } from './invoiceSlice'; // Ensure correct import

export const postInvoice = (data) => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.postInvoiceData(data);
        // Dispatch the action with the response data
        dispatch(postInvoiceDetails(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getInvoice = () => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.getInvoiceData();
        // Dispatch the action with the response data
        dispatch(getInvoiceDetails(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

// export const adminLogout=()=>(dispatch)=>{
//     // console.log('thank you for logout')
//     const { data: responseData } = false;
//     dispatch(adminLoginAuthentication(responseData));
// }