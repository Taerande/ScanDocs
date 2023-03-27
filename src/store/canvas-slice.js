import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        ocrBoxes: [],
    },
    reducers: {
        addOcrBox(state, action) {
            if (state.ocrBoxes.length < 10) {
                state.ocrBoxes.push({
                    x: action.payload.x,
                    y: action.payload.y,
                    w: action.payload.w ? action.payload.w : 100,
                    h: action.payload.w ? action.payload.w : 50,
                })
            }
        },
        clear(state) {
            state.ocrBoxes = [];
        }
    }
});


export const canvasActions = canvasSlice.actions;
export default canvasSlice;