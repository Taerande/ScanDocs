import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import canvasSlice from "./canvas-slice";

const store = configureStore({
    reducer: {
        canvas: canvasSlice.reducer,
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    }
});

export default store;