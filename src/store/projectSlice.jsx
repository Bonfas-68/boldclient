import {createSlice} from "@reduxjs/toolkit"

const projectsSlice = createSlice({
    name:"projects",
    initialState:{
        projects:[],
        loading:false,
        error:'',
        message:null
    },
    reducers:{
        addProject:(state, action)=>{
            state.message = action.payload
        },
        getProjects:(state, action)=>{
            state.projects = action.payload
        }
    }
})
export const {getProjects, addProject} = projectsSlice.actions
export default projectsSlice.reducer