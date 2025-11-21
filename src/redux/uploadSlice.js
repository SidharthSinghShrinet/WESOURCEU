import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
    name:"upload",
    initialState:{
        open:false,
        response:[]
    },
    reducers:{
        setOpen:(state,action)=>{
            state.open = action.payload;
        },
        setResponse:(state,action)=>{
            state.response = action.payload
        }
    }
})

export const {setOpen,setResponse} = uploadSlice.actions;
export default uploadSlice.reducer;