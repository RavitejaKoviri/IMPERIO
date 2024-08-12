import * as requestFromServer from './addressCrud';
import {postAddressData , getAddressData, deleteAddressData, updateAddressData} from './addressSlice';

export const postAddress = (data) => async (dispatch) => {
    console.log("posted address",data);
    try {
        const response = await requestFromServer.postAddressDetails(data);
        // Dispatch the action with the response data
        console.log(response);
        if(response.status==200)
        {
            const id={id:data.id}
            const response = await requestFromServer.getAddressDetails(id);
            dispatch(getAddressData(response)); 
        }
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getAddress = (id) => async (dispatch) => {
    // console.log(data);
    // console.log("get address");
    try {
        const response = await requestFromServer.getAddressDetails(id);
        // Dispatch the action with the response data
        // console.log(response,"hellllloooooo")
        dispatch(getAddressData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const deleteAddress = (data) => async (dispatch) => {
    console.log("delete");
    try {
        const response=await requestFromServer.deleteAddressDetails(data.addressid);
        console.log(response);
        if(response.success==true)
        {
            const uid={id:data.uid}
            const response = await requestFromServer.getAddressDetails(uid);
            dispatch(getAddressData(response));
        }
    } catch (error) {
        console.error("Error in delete action:", error);
    }
};


export const updateAddress = (data) => async (dispatch) => {
    console.log(data)
    try {
      const response = await requestFromServer.updateAddressDetails(data);
      console.log(response)
      if(response.success==true)
        {
            const uid={id:data.user_id}
            const response = await requestFromServer.getAddressDetails(uid);
            dispatch(getAddressData(response));
        }
    } catch (error) {
      console.error("Error in update action:", error);
    }
  };