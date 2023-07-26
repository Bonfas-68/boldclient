import React from 'react';
import { useSelector } from 'react-redux';
import BarCharts from './BarCharts';
import DoughnutChart from './DoughnutChart';
import LineCharts from './LineCharts';

export default function Analysis() {
  const user = useSelector((store) => store.user.user);
  const tasks = useSelector((store) => store.tasks.tasks);
  const total = tasks.filter((t) => t.user_id === user.id).length;

  const complete = tasks.filter(
    (t) => t.user_id === user.id && t.status === 'Done'
  ).length;
  const incomplete = tasks.filter(
    (t) => t.user_id === user.id && t.status === 'To-do'
  ).length;
  const inProgress = tasks.filter(
    (t) => t.user_id === user.id && t.status === 'Doing'
  ).length;

  return (
    <div className="flex flex-col gap-y-6 w-full h-full ">
      <div className="md:flex flex md:items-center items-center justify-between md:justify-between md:flex-row flex-col gap-y-6 w-max h-full md:w-[90%] md:mx-auto mx-auto md:h-full md:p-12">
        <div className="w-max md:w-[50%] h-max md:h-[50vh]">
          <BarCharts />
        </div>
        <div className="w-max md:w-[50%] h-max md:h-[50vh]">
          {' '}
          <DoughnutChart />
        </div>
      </div>
      <div className="md:flex md:flex-row flex flex-col w-full gap-6 p-6">
        <div className="md:flex-1 rounded-md flex flex-col gap-y-2 text-center text-gray-100 shadow-2xl bg-emerald-950 p-4">
          <h2 className="text-4xl font-extralight capitalize tracking-wider text-emerald-100">
            Total tasks
          </h2>
          <span className="text-green-100 text-6xl font-extralight">
            {total}
          </span>
        </div>
        <div className="md:flex-1 rounded-md flex flex-col gap-y-2 text-center text-gray-100 shadow-2xl bg-emerald-950 p-4">
          <h2 className="text-4xl font-extralight capitalize tracking-wider text-emerald-100">
            complete tasks
          </h2>
          <span className="text-green-100 text-6xl font-extralight">
            {complete}
          </span>
        </div>
        <div className="md:flex-1 rounded-md flex flex-col gap-y-2 text-center text-gray-100 shadow-2xl bg-emerald-950 p-4">
          <h2 className="text-4xl font-extralight capitalize tracking-wider text-emerald-100">
            incomplete tasks
          </h2>
          <span className="text-green-100 text-6xl font-extralight">
            {incomplete}
          </span>
        </div>
        <div className="md:flex-1 rounded-md flex flex-col gap-y-2 text-center text-gray-100 shadow-2xl bg-emerald-950 p-4">
          <h2 className="text-4xl font-extralight capitalize tracking-wider text-emerald-100">
            tasks inProgress
          </h2>
          <span className="text-green-100 text-6xl font-extralight">
            {inProgress}
          </span>
        </div>
      </div>

      <div className="w-[50%] mx-auto h-full flex-1 md:mt-12 my-[100px] shadow-2xl rounded-md">
        <LineCharts />
      </div>
    </div>
  );
}
