import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { domain } from '../utils/utils';
import {
  AiOutlineDownCircle,
  AiFillRightCircle,
  AiFillUpCircle,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchTasks, fetchUser} from '../store/serverCall';
import { FaEdit } from 'react-icons/fa';

export default function Profile() {
  const singleUser = useSelector((store)=> store.user.singleUser)
  const user = useSelector((store)=> store.user.user)
  const [showTask, setShowTasks] = useState(false);
  const projects = useSelector((store)=> store.projects.projects.projects)
  const pr = projects.filter((p)=> p.user_id === user.id)
  const tasks = useSelector((store)=> store.tasks.tasks)
  const ts = tasks.filter((t)=> t.user_id === user.id)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(user, dispatch);
    fetchProjects(user, dispatch);
    fetchTasks(user, dispatch);
  }, []);
  return (
    <>
      <div className="md:grid grid-cols-1 md:grid-cols-2 w-max mx-auto md:gap-12 gap-y-12">
        <img
          src={`${domain}/uploads/${singleUser.image}`}
          alt=""
          className="w-full h-[188px] sm:mb-4 object-cover rounded-md border border-green-950 overflow-hidden"
        />
        <div className=" relative bg-green-200/10 text-slate-950/50 h-fit p-6 leading-6 shadow-xl rounded-md">
          <div className="capitalize tracking-wider text-lg font-bold">
            <span className="font-light">name: </span>
            {singleUser.name}
          </div>
          <div className="capitalize tracking-wider text-lg font-bold">
            <span className="font-light">email: </span>
            {singleUser.email}
          </div>
          <div className="capitalize tracking-wider text-lg font-bold">
            <span className="font-light">company: </span>
            {singleUser.company}
          </div>
          <div className="capitalize tracking-wider text-lg font-bold">
            <span className="font-light">role: </span>
            {singleUser.role}
          </div>
          <div className="capitalize tracking-wider text-lg font-bold">
            <span className="font-light w-full text-left">bio: </span>
            {singleUser.bio}
          </div>
          <Link to={`./update`} className='absolute top-5 right-2'>
           <FaEdit className=" text-[2rem] font-extralight cursor-pointer text-gray-500 p-2"/>
          </Link>
           
          
        </div>
        <div className="col-span-2 w-full pb-12">
          <h1 className="md:text-3xl text-2xl text-center mb-4  tracking-wider font-bold my-1">
            Manage your Projects
          </h1>
          <div className="md:grid grid-cols-1 md:grid-cols-2 w-max mx-auto md:gap-12 gap-y-12">
            {pr.map((p) => {
              return (
                <div className="bg-emerald-950 rounded-md self-start shadow-2xl p-4">
                  <h2 className='text-xl text-emerald-100 tracking-wider mb-1 md:mb-2 capitalize font-bold'>{p.user_id === user.id && p.project}</h2>
                  <div className="flex flex-col">
                    {ts.map((t) => (
                      <h2 className='text-md tracking-wide font-extralight text-white mb-1 capitalize '>{t.user_id === user.id && p.project === t.project && t.task}</h2>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
