import React from 'react';
import { useSelector } from 'react-redux';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

const LineCharts = () => {
    const data = useSelector((store) => store.projects.projects.teams);
    console.log(data)
  return (
    <LineChart width={600} className='' height={300} data={data.map((d)=> d)}>
      <Line dataKey='numOftasks' stroke='#2196f3' strokeWidth={12} type='monotone'></Line>
      <Line dataKey='numOfAssignedUsers' stroke='#f44236' strokeWidth={6}  type='monotone'></Line>
      <CartesianGrid stroke='#ccc'/>
      <XAxis dataKey='project'/>
      <YAxis />
      <Legend />
      <h2>Hello chrt</h2>
    </LineChart>
  );
};

export default LineCharts;
