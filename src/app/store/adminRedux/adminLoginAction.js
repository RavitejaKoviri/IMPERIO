import { success } from 'theme/theme-colors';
import * as requestFromServer from './adminLoginCrud';
import { adminLoginAuthentication } from './adminLoginSlice'; // Ensure correct import

export const adminLogin = (data) => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.adminLoginValidate(data);
        const { data: responseData } = response; // Destructure the response correctly
        // Dispatch the action with the response data
        console.log("data of responsedata",responseData)
        dispatch(adminLoginAuthentication(responseData));
        return {
            success: responseData.bool
        }
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const adminLogout=()=>(dispatch)=>{
    // console.log('thank you for logout')
    dispatch(adminLoginAuthentication(false));
}