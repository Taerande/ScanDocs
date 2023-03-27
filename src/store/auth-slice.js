import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        uid:null,
        displayName: null,
        photoUrl: null,
        availableCharacters:[],
    },
    reducers: {
    },
});


export const authActions = authSlice.actions;
export default authSlice;