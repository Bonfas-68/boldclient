import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { domain } from '../utils/utils';
import { Context } from '../context/userContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { addProjects, fetchProjects, fetchTasks } from '../store/serverCall';

export default function AddProject() {
  const dispatch = useDispatch()
  const user = useSelector((store)=> store.user.user)
  
  const navigate = useNavigate()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const projectData = {
        user_id: user.id,
        ...data
      }
      addProjects(projectData, user, dispatch)
      navigate('/dashboard/')
      fetchProjects(user, dispatch)
      reset();
    } catch (error) {
      alert(error.message);
      console.log(error)
    }
  };
  useEffect(()=>{
    fetchProjects(user,  dispatch)
    fetchTasks(user,  dispatch)
  },[])
  return (
    <div className="absolute md:w-[50%] mx-auto w-[77%] flex justify-center items-start shadow-2xl shadow-slate-400 h-max top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white mt-10 md:p-8 px-6 ">
    <form
      className="group my-6 leading-loose md:text-left h-max w-max"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="project" className="project_label">
        Enter Your project or Category of your task
      </label>
      <input
        className="project_input mb-2"
        type="text"
        id="project"
        {...register('project',{required: `Project must be included`})}
        placeholder="Enter Project or category..."
      />
      <p className="text-xs text-red font-extralight block my-1">{errors?.project?.message}</p>
      <div className="flex flex-col md:flex-row  md:gap-x-6 max-w-full gap-y-6 md:gap-y-0 md:items-start">
        <div className="md:flex-1 mb-3">
          <label
            htmlFor="startDate"
            className="project_label"
          >
            Enter start date
          </label>
          <input
            className="project_input"
            type="date"
            id="startDate"
            {...register('startDate',{required: `StartDate must be included`})}
            placeholder="Enter start date..."
          />
          <p className="text-xs text-red font-extralight block my-1">{errors?.startDate?.message}</p>
        </div>
        <div className="md:flex-1 mb-3">
          <label
            htmlFor="dueDate"
            className="project_label"
          >
            Enter end date
          </label>
          <input
            className="project_input"
            type="date"
            id="dueDate"
            {...register('dueDate',{required: `DueDate must be included`})}
            placeholder="Enter end date..."
          />
          <p className="text-xs text-red font-extralight block my-1">{errors?.dueDate?.message}</p>
        </div>
      </div>
      <button className="bg-green-950 text-white py-3 px-5 text-xl font-semibold tracking-wider rounded-md shadow-2xl">
        Submit
      </button>
    </form></div>
  );
}
