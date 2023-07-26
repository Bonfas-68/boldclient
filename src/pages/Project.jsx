import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddTasks from '../features/AddTasks';
import axios from 'axios';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { domain } from '../utils/utils';
import { useSelector } from 'react-redux';
import { UpdateProject } from './UpdateProject';

const Project = () => {
  const user = useSelector((store) => store.user.user);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleProj, setToggleProj] = useState(false);
  const [load, setLoad] = useState(false);
  const [task, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const getTask = async () => {
    try {
      const res = await axios.get(`${domain}/tasks/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      const data = await res.data;
      setLoad(true);
      setTask(data);
      setLoad(false);
      // console.log(task);
    } catch (error) {
      setLoad(false);
      setError(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${domain}/projects/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      const data = await res.data;
      console.log(data);
      alert(data);
    } catch (error) {
      alert(error.message);
    }
  };
  const getProject = async () => {
    try {
      const res = await axios.get(`${domain}/projects/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      const data = await res.data;
      setLoad(true);
      setProject(data);
      setLoad(false);
      // console.log(project);
    } catch (error) {
      setLoad(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    getProject();
    getTask();
  }, []);
  return (
    <div className=" w-full h-full px-6">
      <div className="absolute top-0 right-0 p-6 overflow-y-auto bg-white h-full shadow-2xl shadow-gray-400">
        {toggleAdd && <AddTasks project_id={id} />}
      </div>
      {load && (
        <div className="text-center w-full flex flex-col justify-center shadow-2xl">
          <img src="/load.svg" alt="" />
          <span className="text-2xl font-bold my-2">Loading...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center">
          <span className="text-xl text-gray-500 font-extralight tracking-wider">
            {error}
          </span>
        </div>
      )}
      <div
        className=" relative transition-all duration-1000 z-10  shadow-gray-950 
         bg-gray-100 shadow-2xl h-screen overflow-y-scroll p-6"
      >
        <div className="flex flex-row  justify-between items-center my-4 w-full">
          <h1 className="text-2xl text-gray-800 font-bold tracking-wider capitalize">
            {project.project}
          </h1>
          <div
            className="p-2 bg-gray-600/50 flex flex-row gap-x-2 rounded-md shadow-md cursor-pointer"  onClick={()=> setToggleUpdate(!toggleUpdate)}
          
          >
            <span className="w-2 h-2 text-2xl bg-gray-100 rounded-full shadow-md"></span>
            <span className="w-2 h-2 text-2xl bg-gray-100 rounded-full shadow-md"></span>
            <span className="w-2 h-2 text-2xl bg-gray-100 rounded-full shadow-md"></span>
          </div>
          {toggleUpdate && (
            <div className="absolute top-10  right-24 flex flex-col gap-y-1 px-4 shadow-2xl rounded-md  bg-white py-1">
              <button className=" px-2 capitalize text-emerald-600 text-lg  font-light cursor-pointer rounded-md tracking-wider flex items-center gap-x-2"  onClick={() => setToggleProj(!toggleProj)} >
                <FaEdit /> update
              </button>
              <button
                className=" px-2 capitalize text-red-600 text-lg  font-light cursor-pointer rounded-md tracking-wider flex items-center gap-x-2"
                onClick={() => handleDelete(project.id)}
              >
                <FaTrash /> delete
              </button>
              <Link to={`/dashboard/projects/add`} className=" px-2 capitalize text-green-950 text-lg  font-light cursor-pointer rounded-md tracking-wider flex items-center gap-x-2">
                <FaPlusCircle /> add project
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-4 shadow-2xl w-full rounded-md p-6">
          <div className="flex flex-row text-right items-center w-full justify-between p-2">
            <div className=" relative text-left w-full">
              <span className="text-md block mb-3 font-bold capitalize tracking-wider text-gray-600">
                tasks
              </span>
              <div className="flex flex-row gap-4 overflow-x-scroll ">
                <div className="flex flex-col p-2 gap-y-2">
                  <h4 className="h4">Task</h4>
                  <h4 className="h4">date</h4>
                  <h4 className="h4">status</h4>
                  <h4 className="h4">priority</h4>
                  <h4 className="h4">assigned</h4>
                </div>
                {task.map((t) => (
                  <ul
                    className={
                      t.status === 'Done'
                        ? 'bg-zinc-950 bg-opacity-40 rounded-sm p-2 text-white font-light tracking-wide capitalize flex-1 flex flex-col gap-y-1'
                        : 'bg-emerald-900 w-max rounded-sm p-2 text-white font-light tracking-wide capitalize flex-1 flex flex-col gap-y-2'
                    }
                  >
                    <li>{t.task}</li>
                    <li>
                      {t.startDate} - {t.dueDate}
                    </li>
                    <li>{t.status === 'Done' ? 'Compeleted' : t.status}</li>
                    <li>{t.priority}</li>
                    <li>{t.assigned}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      {toggleProj && <UpdateProject projects={project}/>}
      </div>
    </div>
  );
};

export default Project;


