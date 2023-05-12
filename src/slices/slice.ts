import { createSlice } from "@reduxjs/toolkit";

const name = 'authoring';
const initialState = {
    target:'',
    canvas: undefined,
    activeObject: undefined,
    options: []
}
const slice = createSlice({
    name, 
    initialState,
    reducers: {
        setTarget: (state, action) => {
            state.target = action.payload
        },
        setCanvas: (state, action) => {
            state.canvas = action.payload
        },
        setActiveObejct: (state, action) => {
            state.activeObject = action.payload
        },
        setOptions: (state, action) => {
            state.options = action.payload
        }
    }
})

export const { setTarget, setCanvas, setActiveObejct, setOptions } = slice.actions;
export default slice.reducer;