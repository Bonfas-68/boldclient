import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { domain } from '../utils/utils';
import { FaEdit, FaPlus, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { fetchProjects, fetchTasks } from '../store/serverCall';
import { useDispatch, useSelector } from 'react-redux';

export default function Projects() {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const tasks = useSelector((store) => store.tasks.tasks) || null;
  const projects = useSelector((store) => store.projects.projects.projects) || null;
  const pr = projects.filter((p)=> p.name === user.name)
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${domain}/projects/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      const data = await res.data;
      setLoad(true);
      fetchProjects(user, dispatch);
      fetchTasks(user, dispatch);
      setLoad(false);
    } catch (error) {
      setLoad(false)
      alert(error.message);
    }
  };

  useEffect(() => {
    
    fetchProjects(user, dispatch);
    fetchTasks(user, dispatch);
  }, []);

  return (
    <>
      <div className="relative rounded-md py-3 px-4 h-max md:w-full  w-[100vw] overflow-x-scroll">
        <div className=" flex justify-between items-center w-full ">
          <span className="text-xl font-semibold capitalize md:leading-10 leading-5 md:tracking-widest tracking-wide text-green-950">
            {load ? `Loading Projects...` : `Your Projects`}
          </span>
          <Link
            to="/dashboard/projects/add"
            className="py-2 px-4 text-white capitalize bg-green-700 text-lg font-bold rounded-md shadow-gray-300/40 flex flex-row items-center gap-x-2 shadow-md hover:shadow-lg duration-300 transition-all"
          >
            <FaPlusCircle />
            <span>add project</span>
          </Link>
        </div>
        {load && (
          <img
            className="w-1/2 mx-auto"
            src="/loading.svg"
            alt="loader image"
          />
        )}
        {pr.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full  text-center gap-4">
            <p className="text-xl text-white tracking-wider font-extralight capitalize">
              {pr.length} number of project
            </p>
            <Link to="/dashboard/projects/add" className="mt-2 mb-2">
              <FaPlus className="text-5xl text-gray-200 cursor-pointer" />
            </Link>
          </div>
        )}
        <div className="mt-2 mb-2 bg-emerald-950  shadow-2xl shadow-gray-950/10 w-[100vw]">
          <div className="text-center grid grid-cols-5 text-sm tracking-wider bg-emerald-950 text-white  w-[100vw]">
            <div className="w- border-r border-zinc-300 p-2">Title</div>
            <div className="w- border-r border-zinc-300 p-2">Assigned</div>
            <div className="w- border-r border-zinc-300 p-2">Date</div>
            <div className="w- border-r border-zinc-300 p-2">Manager</div>
            <div className="w- border-r border-zinc-300 p-2">Status</div>
          </div>
          {pr.map((p) => (
            <div
              key={p.id}
              className="md:text-lg flex  w-[100vw] flex-row gap-4 text-md font-extralight capitalize text-green-950/90 "
            >
              <div className=" text-white w-[100vw] font-light">
                <div className="w-[100vw] flex flex-row bg-emerald-900/50 text-xl gap-x-6 items-center">
                  <Link
                    to={`/dashboard/projects/${p.id}`}
                    className="py-2 justify-self-center px-[4px]"
                  >
                    {p.project}
                  </Link>
                  {p.user_id === user.id && (
                    <div className="flex flex-row gap-x-2 pr-2">
                      <Link to={`/dashboard/projects/${p.id}`} className=" text-white text-lg  font-light cursor-pointer rounded-md tracking-wider">
                        <FaEdit />
                      </Link>
                      <button
                        className="text-red-600 text-lg  font-light cursor-pointer rounded-md tracking-wider"
                        onClick={() => handleDelete(p.id)}
                      >
                        <FaTrash />
                      </button>
                      <Link to={`/dashboard/projects/add`} className="text-green-100 text-lg  font-light cursor-pointer rounded-md tracking-wider">
                        <FaPlusCircle />
                      </Link>
                    </div>
                  )}
                </div>
                <div className="w-[100vw] ">
                  {tasks.map((t) => (
                    <div
                      key={t.id}
                      className="text-left grid grid-cols-5 w-[100vw] text-sm tracking-wider text-zinc-200 "
                    >
                      {t.project === p.project && user.id === t.user_id && (
                        <>
                          <div className="md:w-full w-[100px] overflow-hidden  border-r border-zinc-400 p-2">{t.task}</div>
                          <div className="w-full overflow-hidden border-r border-zinc-400 p-2">
                            {t.assigned}
                          </div>
                          <div className="w-full overflow-hidden border-r border-zinc-400 p-2">
                            {t.startDate.slice(5, 10)} -{t.dueDate.slice(5, 10)}
                          </div>
                          <p className='w-full border-r border-zinc-400 p-2'>{t.name}</p>
                          <p className='w-full border-r border-zinc-400 p-2'>{t.status}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
