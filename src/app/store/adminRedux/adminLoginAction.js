import * as requestFromServer from './adminLoginCrud';
import { adminLoginAuthentication } from './adminLoginSlice'; // Ensure correct import

export const adminLogin = (data) => async (dispatch) => {
   
    try {
        const response = await requestFromServer.adminLoginValidate(data);
        const { data: responseData } = response; // Destructure the response correctly
        // Dispatch the action with the response data
     
        dispatch(adminLoginAuthentication(responseData));
    } catch (error) {
       
    }
};

export const adminLogout=()=>(dispatch)=>{
    dispatch(adminLoginAuthentication(false));
}