import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        uid: null,
        email: null,
        displayName: null,
    },
    reducers: {
        setAuth: (state, action) => {
            state.isLogin = true;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
        }
    },
});


export const authActions = authSlice.actions;
export default authSlice;