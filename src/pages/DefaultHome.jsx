import React, { useContext, useEffect, useState } from 'react';
import Comments from './Comments';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';
import { domain } from '../utils/utils';
import { Context } from '../context/userContext';
import AddComment from '../features/AddComment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DefaultHome() {
  const [project, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.user.user);
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${domain}/tasks`, {
        headers: { Authorization: `${user.token}` },
      });
      setLoad(true);
      setTasks(res.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      alert(error.message);
      setError(error.message);
      console.log(error);
    }
  };
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${domain}/projects`, {
        headers: { Authorization: `${user.token}` },
      });
      setLoad(true);
      setProjects(res.data.projects);
      setLoad(false);
      setError(false);
    } catch (error) {
      setLoad(false);
      alert(error.message);
      setError(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);
  const mytime = new Date().toLocaleTimeString();
  return (
    <div className="w-max md:w-max items-start mx-auto flex flex-col gap-y-6  md:grid  md:grid-cols-2 md:gap-12 md:gap-y-10 h-max  align-start">
      <div className="col-span-2  w-50 mx-auto mb-3 text-3xl font-medium tracking-wider capitalize ">
        {/* {mytime >= 12  ? 'Good evening' : 'Good Morning'},{mytime} */}
        {mytime.split(':')[0] >= 12 && mytime.split(':')[0] >= 1
          ? `Good evening`
          : `Good Morning`}
        ,{user.name}
      </div>
      <div className="col-span-2 flex flex-row gap-x-4 mx-auto w-max px-6">
        <Link
          className="border border-green-950/20 rounded-md py-3 px-5 text-gray-600 font-light tracking-wider capitalize"
          to="/dashboard/add"
        >
          Add Project
        </Link>
        <Link
          className="border border-green-950/20 rounded-md py-3 px-5 text-gray-600 font-light tracking-wider capitalize"
          to="/dashboard/addTask"
        >
          Add Task
        </Link>
      </div>
      <div className="border border-green-900/50 rounded-md py-3 px-4 h-max md:w-full w-[100%]">
        <h2 className="text-xl font-semibold capitalize md:leading-10 leading-5 md:tracking-widest tracking-wide text-green-950">
          Your Projects
        </h2>
        {load && (
          <img
            className="w-1/2 mx-auto"
            src="/loading.svg"
            alt="loader image"
          />
        )}
        {error && <span className="text-center">{error}</span>}
        <Link to="/dashboard/projects" className="mt-2 mb-2">
          {project.map((p) => (
            <>
              {p.length !== 0 && (
                <p
                  key={p.id}
                  className="md:text-lg text-md font-extralight capitalize text-green-950/90 "
                >
                  {p.user_id === user.id ? p.project : null}
                </p>
              )}
            </>
          ))}
        </Link>
        <Link
          className="border border-green-950/20 rounded-md py-1 px-3 text-gray-600 font-light tracking-wider capitalize my-1"
          to="/dashboard/add"
        >
          Add Project
        </Link>
      </div>
      <Link
        to="/dashboard/profile"
        className="border border-green-900/50 rounded-md py-3 px-4 flex flex-col h-max  gap-y-4 w-[100%] md:w-full hover:bg-green-900/10 duration-300 transition-all"
      >
        <h2 className="text-xl font-semibold capitalize leading-10 tracking-widest text-green-950">
          View your profile
        </h2>
        <span className="text-xl font-light tracking-wider leading-5 capitalize">
          {user.name}
        </span>
        <span className="text-sm font-light tracking-wide  w-full mb-1 capitalize">
          {user.company}
        </span>
        <span className="text-sm font-semibold tracking-wide  w-full mb-1 capitalize">
          {user.role}
        </span>
      </Link>
      
      <div className="border border-green-900/50 rounded-md py-3 px-4 w-[100%] md:w-full h-max">
        <h2 className="text-xl font-semibold capitalize leading-10 tracking-widest text-green-950">
          your team members
        </h2>
        <ul className="indent-4 ml-4">
          {tasks.map((t) => (
            <>
              {t.user_id === user.id ? (
                <li
                  key={t.id}
                  className="list-decimal text-lg font-light text-gray-500 mb-2"
                >
                  <i>{t.assigned}</i>
                </li>
              ) : null}
            </>
          ))}
          <p className="text-xs text-center text-gray-500">
            <em className='block'>Add tasks and assign members to create a team</em>
            <Link
              className="border  inline-block  border-green-950/20 rounded-md py-1 px-3 text-gray-600 font-light tracking-wider capitalize my-1"
              to="/dashboard/addTask"
            >
              Add tasks
            </Link>
          </p>
        </ul>
      </div>

     
    </div>
  );
}
