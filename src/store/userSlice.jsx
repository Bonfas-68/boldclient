import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name:'user',
    initialState:{
        singleUser:[],
        users:[],
        user:[],
        errors:null,
        success:null
    },
    reducers:{
        login:(state, action)=>{
            state.user = action.payload
        },
        getUsers:(state, action)=>{
            state.users = action.payload
        },
        getUser:(state, action)=>{
            state.singleUser = action.payload
        },
        logout: (state)=>{
            state.user = null
            state.singleUser = null
        }
    }
})
export const {login, getUser, getUsers, logout} = userReducer.actions
export default userReducer.reducer