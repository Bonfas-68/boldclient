import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from '../utils/utils';
import { useSelector } from 'react-redux';

export function UpdateProject({ projects }) {
  const user = useSelector((store) => store.user.user);
  const [project, setProject] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      project,
      user_id: user.id,
      startDate,
      dueDate,
    };
    const res = await axios.put(`${domain}/projects/${projects.id}`, newProject, {
      headers: { Authorization: `${user.token}` },
    });
    console.log(res);
    const data = await res.data;
    alert(data);
  };
  useEffect(() => {
    setProject(projects.project);
    setStartDate(projects.startDate);
    setDueDate(projects.dueDate);
  }, []);
  return (
    <form className="shadow-2xl rounded-md   p-12" onSubmit={handleSubmit}>
      <div className="group my-6 leading-loose">
        <label
          htmlFor="category"
          className="text-2xl text-green-950 font-light"
        >
          Update Your tasks
        </label>
        <input
          className="py-3 px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
          type="text"
          id="category"
          name="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Update Project e.g Develop frontend>" />
        <div className="flex flex-col md:flex-row  md:gap-x-6 max-w-full p-6 gap-y-6 md:gap-y-0 items-Uupdate">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="text-2xl text-green-950 font-light"
            >
              Update start date
            </label>
            <input
              className="py-3 px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Update start date..." />
          </div>
          <div className="flex-1">
            <label
              htmlFor="dueDate"
              className="text-2xl text-green-950 font-light"
            >
              Update end date
            </label>
            <input
              className="py-3 px-5 border-2 border-purple-900 rounded-md placeholder:text-lg placeholder:text-gray-500/70 mt-6 w-full focus:outline-none text-lg text-purple-900 font-md"
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Update end date..." />
          </div>
        </div>
      </div>
      <button className="bg-green-950 text-white mt-2 py-3 px-5 text-xl font-semibold tracking-wider rounded-md shadow-2xl">
        Submit
      </button>
    </form>
  );
}
