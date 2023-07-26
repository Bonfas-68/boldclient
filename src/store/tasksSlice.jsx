import {createSlice} from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name:"tasks",
    initialState:{
        tasks:[],
        loading:false,
        error:'',
        message:null
    },
    reducers:{
        addTask:(state, action)=>{
            state.message = action.payload
        },
        getTasks:(state, action)=>{
            state.tasks = action.payload
        },
        loadTasks:(state, action)=>{
            state.loading = action.payload
        },
        errorFetch:(state, action)=>{
            state.error = action.payload
        }
    }
})
export const {getTasks, addTask, errorFetch, loadTasks} = tasksSlice.actions
export default tasksSlice.reducer