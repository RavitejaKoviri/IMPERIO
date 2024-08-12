// app/store/userRedux/userCRUD.js (or equivalent file)
// Adjust import path as needed
import axios from "axios";
export const saveUser = async (userData) =>  {
    // Perform async operations here (e.g., fetch API call)
    console.log(userData)
    return await axios.post('/api/userRegister', userData);
};

export const verifyMobileNumber=async (mobileNumber)=>{
    console.log(mobileNumber);
    return await axios.post('/api/sendOTP',mobileNumber);
}

export const verifyOtp=async (numberwithotp)=>{
    console.log(numberwithotp)
    return await axios.post('/api/verifyOTP',numberwithotp)
}

export const loginValidation=async (data)=>{
    console.log(data);
    return await axios.post('/api/userLogin',data)
}
