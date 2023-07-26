import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from '../utils/utils';
import Task from './Task';
import { fetchProjects, fetchTasks } from '../store/serverCall';
import { useDispatch, useSelector } from 'react-redux';

export default function Tasks() {
  // const [tasks, setTasks] = useState([])
  const user = useSelector((store)=> store.user.user)
  const tasks = useSelector((store)=> store.tasks.tasks) || null
  const [load, setLoad] = useState(false)
  const userTask = tasks.filter((task)=> task.name === user.name)
  console.log(userTask)
  const dispatch = useDispatch()
  const getTasks = async () => {
    try {
      setLoad(true)
      fetchTasks(user, dispatch)
      setLoad(false)
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getTasks();
    fetchProjects(user, dispatch)
  }, []);
  return (
    <div className='w-max mx-auto px-5    '>
      <h2 className="text-2xl text-white bg-emerald-900 my-2 p-2 rounded-md font-semibold tracking-wider">
        Welcome back, See your Progress
      </h2>
      <div className="border bg-slate-950 border-slate-500/70 rounded-t-md overflow-x-auto">
      <table className="table-fixed table-row w-[100vw] overflow-x-scroll">
        <thead className='w-[100%]'>
          <tr className='bg-slate-900/90 w-[100%] grid grid-cols-6 gap-x-2  items-center px-2'>
            <th className='tb_header w-max'>Category</th>
            <th className='tb_header'>Tasks</th>
            <th className='tb_header'>assignee</th>
            <th className='tb_header'>Date</th>
            {/* <th className='tb_header'>dueDate</th> */}
            <th className='tb_header'>status</th>
            <th className='tb_header'>priority</th>
          </tr>
        </thead>
        <tbody className='border-b  h-auto'>
          {load ? <img className='w-32 mx-auto' src='/loading.svg' alt='loader image' /> : ( userTask.map((task)=>(
            <Task key={task.id} task={task}/>
          )))}
        </tbody>
      </table>
      
      </div>
    </div>
  );
}
