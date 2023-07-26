import axios from 'axios';
import { domain } from '../utils/utils';
import { getUser, getUsers, login, logout } from './userSlice';
import { errorFetch, getTasks, addTask, loadTasks } from './tasksSlice';
import {
  getProjects,
  addProject,
} from './projectSlice';

export const loginUser = async (state, dispatch) => {
  try {
    const res = await axios.post(`${domain}/auth/login`, state);
    const data = await res.data;
    dispatch(login(data));
  } catch (error) {
    alert(error.message)
  }
};
export const logoutUser = (state)=>{
  logout(state)
}
export const fetchTasks = async (user,dispatch) => {
  try {
    const res = await axios.get(`${domain}/tasks`,
    {
      headers: { Authorization: `${user.token}` },
    });
    const data = await res.data;
    dispatch(getTasks(data));
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
};
export const addTasks = async (state, user, dispatch) => {
  try {
    const res = await axios.post(`${domain}/tasks`, state,
    {
      headers: { Authorization: `${user.token}` },
    });
    const data = await res.data;
    dispatch(addTask(data));
    fetchTasks(user, dispatch)
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
};
export const fetchProjects = async (user, dispatch) => {
  try {
    const res = await axios.get(`${domain}/projects`,
    {
      headers: { Authorization: `${user.token}` },
    });
    const data = await res.data;
    dispatch(getProjects(data));
    console.log(data)
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
};

export const addProjects = async (state,user, dispatch) => {
  try {
    const res = await axios.post(`${domain}/projects`, state,
    {
      headers: { Authorization: `${user.token}` },
    });
    const data = await res.data;
    dispatch(addProject(data));
    fetchProjects(user, dispatch)
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
};
// users calls
export const fetchUsers = async (user, dispatch) => {
  try {
    const res = await axios.get(`${domain}/users`,
    {
      headers: { Authorization: `${user.token}` },
    });
    const data = await res.data;
    dispatch(getUsers(data));
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
};
export const fetchUser = async (user, dispatch) => {
  try {
    const res = await axios.get(`${domain}/users/${user.id}`,
    {
      headers: { Authorization: `${user.token}` },
    });
    const data = await res.data;
    dispatch(getUser(data));
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
};
