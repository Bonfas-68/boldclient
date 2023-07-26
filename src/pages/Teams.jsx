import React from 'react';
import { useSelector } from 'react-redux';
import AddComment from '../features/AddComment';
import Comments from './Comments';

export default function Teams() {
  const tasks = useSelector((store) => store.tasks.tasks);
  const user = useSelector((store) => store.user.user);
  const projects = useSelector((store) => store.projects.projects.projects);
  const project = useSelector((store) => store.projects.projects.teamsProject);
  const pr = projects.filter((p) => p.name === user.name && p.project);
  const tass = project.map((p)=> p.task)
  const ts = tasks.filter((t) => t.name === user.name && t)
  console.log(ts)
  return (
    <div className="w-full md:px-12 px-4 pb-32">
      <h1 className="text-6xl text-center text-gray-800 p-4 font-light">
        Teams
      </h1>
      <div className="md:flex md:flex-row md:justify-between md:gap-x-6 gap-y-4 w-full md:w-[90%] md:mx-auto">
        <div className="flex flex-col md:w-[100%] h-max w-full shadow-2xl ">
          {pr.map((p) => (
            <div key={p.id} className="mb-6">
              <h2 className=" text-white p-2 text-4xl tracking-wider font-extralight bg-slate-950 capitalize">
                {p.project} team
              </h2>
              {ts.map((task) => (
                <div className="grid md:gap-6 grid-cols-3 p-2 ">
                  <p className="w-full">
                    {p.project === task.project && task.task}
                  </p>
                  <p className=" text-center bg-green-600 block md:w-max md:h-max w-max mx-auto h-max p-[4px] text-white font-extralight rounded-full uppercase text-xs">
                    {task.project === p.project && task.assigned.slice(0, 2)}
                  </p>
                  <p className="md:w-full text-center">
                    {task.project === p.project && task.status}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="shadow-2xl h-max md:w-[100%]">
          <div className="h-full w-full text-white">
            <Comments />
            <AddComment />
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamsProject = ({task, p})=>{
  return(
    <div key={p.id} className="mb-6">
              <h2 className=" text-white p-2 text-4xl tracking-wider font-extralight bg-slate-950 capitalize">
                {p.project} team
              </h2>
              {ts.map((task) => (
                <div className="grid md:gap-6 grid-cols-3 p-2 ">
                  <p className="w-full">
                    {p.project === task.project && task.task}
                  </p>
                  <p className=" text-center bg-green-600 block md:w-max md:h-max w-max mx-auto h-max p-[4px] text-white font-extralight rounded-full uppercase text-xs">
                    {task.project === p.project && task.assigned.slice(0, 2)}
                  </p>
                  <p className="md:w-full text-center">
                    {task.project === p.project && task.status}
                  </p>
                </div>
              ))}
            </div>
  )
}