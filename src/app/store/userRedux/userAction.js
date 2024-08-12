
import * as requestFromServer from './userCRUD';
import { saveUserDetails,userMobileNumberValidation,userOtpValidation,userLoginValidation} from './userRegisterSlice';

export const userRegister = (userData) => async (dispatch) => {
  console.log(userData)
  try {
    const response = await requestFromServer.saveUser(userData);
    const { data } = response;
    console.log('Data saved:', data);
    dispatch(saveUserDetails(data));
  } catch (error) {
    console.log('User not saved');
    
  }
};

export const mobileValidation=(mobileNumber)=>async (dispatch)=>{
  console.log(mobileNumber);
  try{
    const response=await requestFromServer.verifyMobileNumber(mobileNumber);
    console.log(response) ;  
    dispatch(userMobileNumberValidation(response.data));
  }
  catch(error){
    console.log(error,"invalid number");
  }
}
  export const otpVerification=(numberwithotp)=>async (dispatch)=>{
  console.log(numberwithotp)
    try{
      const response=await requestFromServer.verifyOtp(numberwithotp);
      console.log(response);
      dispatch(userOtpValidation(response.data))
    }
    catch{
      console.log("error otp")
    }
  }

  export const loginValidation=(data)=>async (dispatch)=>{
    console.log(data);
    try{
      const response=await requestFromServer.loginValidation(data);
      dispatch(userLoginValidation(response.data));
    }
    catch(error){
      console.log("error validation")
    }
  }

  export const userLogout=()=>async (dispatch)=>{
    dispatch(userLoginValidation("false"))
  }

