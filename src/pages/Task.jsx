import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/userContext';
import { useSelector } from 'react-redux';
import ViewTask from './ViewTask';
import axios from 'axios';
import { domain } from '../utils/utils';

export default function Task({ task }) {
  const [alerts, setAlert] = useState('');
  const [complete, setComplete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const user = useSelector((store) => store.user.user);
  const handleChange = async () => {
    setComplete(true);
  };
  return (
    <>
      <div
        className={complete || task.status === 'Done' ? '   z-10 ' : 'w-[100%]'}
      >
        <tr className={'tb_row z-30 w-full '}>
          <td className="td_content flex gap-x-1 items-center cursor-pointer">
            <input
              disabled={complete &&complete}
              type="checkbox"
              onChange={handleChange}
              className=" text-white w-min rounded-full p-1  bg-emerald-400"
            />
            <span onClick={() => setToggleView(!toggleView)}>
              {task.project}
            </span>
          </td>
          <td className="td_content">{task.task}</td>
          <td className="td_content">
            {task?.assigned
              ? `${task?.assigned.slice(0, 12)}...`
              : `${task.name}`}
          </td>
          <td className="td_content">
            {new Date(task.startDate).toString().slice(4, 11)} &mdash;
            {new Date(task.dueDate).toString().slice(4, 11)} 
            {new Date().toString().slice(4, 11) >= new Date(task.dueDate).toString().slice(4, 11) && new Date(task.dueDate).toString().slice(4, 7) === new Date().toString().slice(4, 7) &&  (<span className=' tracking-wider text-xs font-bold inline-flex'> &mdash; <em className='bg-red-600 text-white px-1 py-[1px] rounded-full '> OverDue</em></span>)}
          </td>
          <td
            className={
              task.status === 'Done' || complete
                ? 'bg-emerald-900 tracking-wider  text-xs flex justify-center self-center font-light text-white px-1 py-[1px] h-max rounded-full w-max'
                : task.status === 'Doing'
                ? 'bg-orange-900 tracking-wider text-xs flex justify-center self-center font-light text-white px-1 py-[1px] h-max rounded-full w-max'
                : task.status === 'To-do'
                ? ' bg-yellow-700 tracking-wider text-xs flex justify-center self-center font-light text-white px-1 py-[1px] h-max rounded-full w-max'
                : 'td-content'
            }
          >
            {complete || task.status === 'Done' ? `Completed` : task.status}
          </td>
          <td
            className={
              task.priority === 'High'
                ? 'bg-emerald-600  tracking-wider text-xs font-light text-white px-1 py-[1px] self-center h-max rounded-full w-max '
                : task.priority === 'Low'
                ? 'bg-red-400  tracking-wider text-xs font-light text-white px-1 py-[1px] self-center h-max rounded-full w-max '
                : task.priority === 'Medium'
                ? ' bg-yellow-600  tracking-wider text-xs font-light text-white px-1 py-[1px] self-center h-max rounded-full w-max'
                : 'tb_content'
            }
          >
            {task.priority}
          </td>
        </tr>
        {toggleView && <ViewTask t={task} />}
      </div>
    </>
  );
}
