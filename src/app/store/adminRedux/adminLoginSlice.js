import { createSlice } from "@reduxjs/toolkit";

export const initialAdminLoginState = {
    AdminAuth: false,
    msg:""
};

const adminLoginAuthSlice = createSlice({
    name: 'admin',
    initialState: initialAdminLoginState,
    reducers: {
        adminLoginAuthentication: (state, action) => {
            // const {value} =action.payload;
            // console.log("Action dispatched:", action);
             console.log("Payload:", action.payload);
            if (action.payload.bool == "true" ) {
                // console.log("jo");
                state.AdminAuth = true;
                state.msg=action.payload.msg;
            }
            else{

                state.AdminAuth=false;
            }
           console.log(state.AdminAuth)
        },
    },
});

export const { adminLoginAuthentication } = adminLoginAuthSlice.actions;
export default adminLoginAuthSlice.reducer;
