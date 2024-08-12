import { createSlice } from '@reduxjs/toolkit';

export const initialUserValidationState={
  UserAuth: false,
  validMobileNumber:false,
  otp:null,
  otpVerified:false,
  loginVerified:false,
  userid:null,
  username:null,
  usermail:null,
  userPhoneNumber:null
}

const userRegisterSlice = createSlice({
  name: 'user',
  initialState: initialUserValidationState,
  reducers: { 
    saveUserDetails: (state, action) => {
      console.log(action.payload)
      if (action.payload == "true" ) {
        console.log("jo");
        state.UserAuth = true;
    }
    else{

        state.UserAuth=false;
    }

    },
  
  userMobileNumberValidation:(state,action)=>{
    console.log(action.payload)
    if(action.payload.success){
      state.validMobileNumber=true;
      state.otp=action.payload.otp;
    }
    else
    state.validMobileNumber=false;
  console.log(state.validMobileNumber)
  console.log( state.otp)
  },

  userOtpValidation:(state,action)=>{
    console.log(typeof action.payload)
    if(action.payload=="true")
      state.otpVerified=true;
    else
    state.otpVerified=false;
  },
  userLoginValidation:(state,action)=>{
    console.log( action.payload)
    console.log(typeof(action.payload.auth));
    if(action.payload.auth=="true"){
      state.loginVerified=action.payload.auth;
      state.userid=action.payload.id;
      state.username=action.payload.name+action.payload.lname;
      state.usermail=action.payload.mail;
      state.userPhoneNumber=action.payload.phnnumber;
    }
    else{
      console.log("hi logout")
    state.loginVerified=false;
    state.UserAuth=false;
    state.validMobileNumber=false;
    state.otpVerified=false;
    }
    console.log("initialstate",state.loginVerified+" "+state.userid+" "+state.username+" "+state.usermail+" "+state.userPhoneNumber)
  }
 
},
});

export const { saveUserDetails,userMobileNumberValidation,userOtpValidation,userLoginValidation } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
