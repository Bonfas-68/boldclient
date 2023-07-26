import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domain } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchTasks } from '../store/serverCall';

export function UpdateTask({ tasks, setToggleUpdate }) {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assigned, setAssigned] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      task,
      assigned,
      priority,
      startDate,
      status,
      dueDate
    };
    try {
      const res = await axios.put(`${domain}/tasks/${tasks.id}`, newTask, {
        headers: { Authorization: `${user.token}` }
      });
      const data = await res.data;
      alert(data);
      fetchProjects(user, dispatch);
      fetchTasks(user, dispatch);
      navigate("/dashboard/tasks");
      setToggleUpdate(false);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    setTask(tasks.task);
    setAssigned(tasks.assigned);
    setStartDate(tasks.startDate);
    setDueDate(tasks.dueDate);
    setPriority(tasks.priority);
    setStatus(tasks.status);
  }, []);
  // console.log(tasks)
  return (
    <form
      className="md:shadow-2xl rounded-md p-6 md:p-12"
      onSubmit={handleSubmit}
    >
      <div className="group my-2 md:my-6 leading-loose">
        <label
          htmlFor="category"
          className="md:text-2xl text-xl text-green-950 font-light"
        >
          Update Your tasks
        </label>
        <input
          className="md:py-3 py-2 px-3 md:px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
          type="text"
          id="category"
          name='task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Update task e.g Complete frontend>" />
        <div className="flex flex-col md:flex-row  md:gap-x-6 max-w-full md:p-6 gap-y-6 md:gap-y-0 md:items-center">
          <div className="flex-1 py-2">
            <label
              htmlFor="startDate"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Update start date
            </label>
            <input
              className="md:py-3 py-2 px-3 md:px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
              type="date"
              id="startDate"
              name='startDate'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Update start date..." />
          </div>
          <div className="flex-1">
            <label
              htmlFor="dueDate"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Update end date
            </label>
            <input
              className="md:py-3 py-2 px-3 md:px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
              type="date"
              id="dueDate"
              name='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Update end date..." />
          </div>
        </div>
        <div className="flex flex-col md:items-center md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 mt-4 w-full">
          <div className="flex-1">
            <label
              htmlFor="priority"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Add priority
            </label>
            <select
              name='priority'
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="md:py-3 py-2 px-3 md:px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70  mt-3 md:mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
            >
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium"> Medium</option>
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="status"
              className="md:text-2xl text-xl text-green-950 font-light"
            >
              Enter Status
            </label>
            <select
              name='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id=""
              className="md:py-3 py-2 px-3 md:px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
            >
              <option value="To-do">To-do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      </div>

      <div className="group my-6 leading-loose">
        <label
          htmlFor="assignee"
          className="md:text-2xl text-xl text-green-950 font-light"
        >
          Assign member Update their email
        </label>
        <input
          className="md:py-3 py-2 px-3 md:px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-3 md:mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
          type="text"
          id="assignee"
          name='assigned'
          value={assigned}
          onChange={(e) => setAssigned(e.target.value)}
          placeholder="Update emails e.g oluochbonfas@gmail.com..." />
      </div>
      <button className="bg-green-950 text-white mt-2 py-3 px-5 text-xl font-semibold tracking-wider rounded-md shadow-2xl">
        Submit
      </button>
    </form>);
}
