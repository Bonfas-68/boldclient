import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { domain } from '../utils/utils';
import { Context } from '../context/userContext';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTasks, fetchProjects, fetchTasks } from '../store/serverCall';

export default function AddTasks({ project_id }) {
  const tasks = useSelector((store) => store.tasks.tasks);
  const projects = useSelector((store) => store.projects.projects.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const taskData = {
        manager: user.id,
        ...data,
      };
      addTasks(taskData, user, dispatch);
      reset();
      navigate(`/dashboard/tasks`);
      fetchProjects(user, dispatch);
      fetchTasks(user, dispatch);
      // console.log(daproj)
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects(user, dispatch);
    fetchTasks(user, dispatch);
  }, []);
  return (
    <form
      className="shadow-md rounded-md max-w-[50%] mx-auto md:p-6 p-3 bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="group md:my-6 md:leading-loose leading-tight">
        <label
          htmlFor="category"
          className="md:text-2xl  text-xl text-green-950 font-light"
        >
          Select Your Project
        </label>
        <select
          name="projects"
          id="projects"
          placeholder="Select Your Project to add tasks"
          {...register('project_id')}
          className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md mt-3:md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
        >
          {projects.map((p) => (
            <>
              {p.user_id === user.id && (
                <option value={p.id}>{p.project}</option>
              )}
            </>
          ))}
        </select>
        <label
          htmlFor="category"
          className="md:text-2xl text-xl text-green-950 font-light"
        >
          Enter Your tasks
        </label>
        <input
          className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md mt-3:md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
          type="text"
          id="category"
          {...register('task')}
          placeholder="Enter task e.g Complete frontend>"
        />
        <div className="flex flex-col md:flex-row  md:gap-x-6 max-w-full  gap-y-3 md:gap-y-0 md:items-center">
          <div className="md:flex-1 py-2">
            <label
              htmlFor="startDate"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Enter start date
            </label>
            <input
              className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md mt-3:md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
              type="date"
              id="startDate"
              {...register('startDate')}
              placeholder="Enter start date..."
            />
          </div>
          <div className="md:flex-1">
            <label
              htmlFor="dueDate"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Enter end date
            </label>
            <input
              className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md mt-3:md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
              type="date"
              id="dueDate"
              {...register('dueDate')}
              placeholder="Enter end date..."
            />
          </div>
        </div>
        <div className="flex flex-col md:items-center md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 md:mt-4 w-full">
          <div className="md:flex-1 py-2">
            <label
              htmlFor="priority"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Add priority
            </label>
            <select
              {...register('priority')}
              className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70  mt-3 md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
            >
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium"> Medium</option>
            </select>
          </div>
          <div className="md:flex-1 py-2">
            <label
              htmlFor="status"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Enter Status
            </label>
            <select
              {...register('status')}
              id=""
              className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
            >
              <option value="To-do">To-do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      </div>

      <div className="group my-6 md:leading-loose leading-tight">
        <label
          htmlFor="assignee"
          className="md:text-2xl text-xl text-green-950 font-light"
        >
          Assign member add their email
        </label>
        <input
          className="py-3 px-3 border border-gray-900/40 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-4 w-full focus:outline-none text-lg text-gray-400 font-md"
          type="text"
          id="assignee"
          {...register('assigned')}
          placeholder="Enter emails e.g oluochbonfas@gmail.com..."
        />
      </div>
      <button className="bg-green-950 text-white mt-2 py-3 px-5 text-xl font-semibold tracking-wider rounded-md shadow-2xl">
        Submit
      </button>
    </form>
  );
}
