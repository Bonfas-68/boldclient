import axios from 'axios';
import React, { useState } from 'react';
import {FaArrowAltCircleLeft, FaArrowCircleRight, FaEdit, FaPlusCircle, FaTrash} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { domain } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/serverCall';
import { UpdateTask } from './UpdateTask';
import DeleteMessage from '../components/DeleteMessage';

export default function ViewTask({t}) {
  const [showButtons, setShowButtons]= useState(false)
  const [message, setMessage]= useState(null)
  const [toggleUpdate, setToggleUpdate]= useState(false)
  const user  =  useSelector((store)=> store.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDelete = async(id)=>{
    const res = await axios.delete(`${domain}/tasks/${id}`,{
      headers: {Authorization: `${user.token}`}
    })
    const data = await res.data
    setMessage(data.message)
    fetchTasks(user, dispatch)
  }
  return (
    <div className='absolute top-0  transition-all duration-1000 z-10  shadow-gray-950 pt-32  right-0 md:w-1/2 bg-white shadow-2xl h-screen overflow-y-scroll p-6'>
    
      <Link to="/dashboard/" className="absolute  top-16 left-2  w-16 h-16 rounded-full shadow-2xl text-2xl p-2 flex items-center justify-center"><FaArrowAltCircleLeft  /></Link>
      <div className=" relative flex flex-row  justify-between items-center my-4 w-full">
        <h1 className='text-2xl text-gray-800 font-bold tracking-wider capitalize'>{t.project}</h1>
        <div className=" flex flex-row gap-x-2 cursor-pointer bg-emerald-950/70 w-max h-max rounded-lg shadow-lg p-2" onClick={()=>setShowButtons(!showButtons)} title='Expand Menu'>
          <span className="w-2 h-2 bg-emerald-100  rounded-full shadow-md gap-x-1 font-bold"></span>
          <span className="w-2 h-2 bg-emerald-100  rounded-full shadow-md gap-x-1 font-bold"></span>
          <span className="w-2 h-2 bg-emerald-100  rounded-full shadow-md gap-x-1 font-bold"></span>
        </div>
        {}
        {showButtons &&(
          <div className="absolute top-10 right-0 flex flex-col gap-y-1 px-4 shadow-lg rounded-md  bg-white py-1">
            <button className=" px-2 capitalize text-emerald-600 text-lg  font-light cursor-pointer rounded-md tracking-wider flex items-center gap-x-2" onClick={()=> setToggleUpdate(!toggleUpdate)}><FaEdit /> update</button>
            <button className=" px-2 capitalize text-red-600 text-lg  font-light cursor-pointer rounded-md tracking-wider flex items-center gap-x-2" onClick={()=> handleDelete(t.id)}><FaTrash /> delete</button>
            <button className=" px-2 capitalize text-green-950 text-lg  font-light cursor-pointer rounded-md tracking-wider flex items-center gap-x-2" onClick={()=> {navigate("/dashboard/addTask")}}><FaPlusCircle /> add task</button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-4 md:shadow-2xl shadow-md rounded-md p-6">
        <div className="flex flex-row text-right items-center justify-between p-2">
          <h2 className="text-left">
            <span className="text-md block mb-1 font-light capitalize tracking-wider text-gray-600">task</span>
            {t.task}</h2>
          <h2 className="text-left">
            <span className="text-md block mb-1 font-light capitalize tracking-wider text-gray-600">status</span>
            {t.status}</h2>
        </div>
        <div className="flex flex-row text-right items-center justify-between p-2">
          <h2 className="text-left"><span className="text-md block mb-1 font-light capitalize tracking-wider text-gray-600">start date</span>{t.startDate}</h2>
          <h2 className="text-left"><span className="text-md block mb-1 font-light capitalize tracking-wider text-gray-600">due date</span>{t.dueDate}</h2>
        </div>
        <div className="flex flex-row text-right items-center justify-between p-2">
          <h2 className="text-left"><span className="text-md block mb-1 font-light capitalize tracking-wider text-gray-600">priority</span>{t.priority}</h2>
          <h2 className="text-left"><span className="text-md block mb-1 font-light capitalize tracking-wider text-gray-600">team menber assigned</span>{t.assigned}</h2>
        </div>
      </div>
      {toggleUpdate && <UpdateTask tasks={t} setToggleUpdate={setToggleUpdate}/>}
    </div>
  );
}


