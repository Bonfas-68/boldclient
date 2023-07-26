import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js/auto';
import { useSelector } from 'react-redux';

ChartJs.register(CategoryScale, LinearScale, BarElement);

export default function BarCharts() {
  const user = useSelector((store) => store.user.user);
  const numTasksPerProject = useSelector((store) => store.projects.projects.teams);
  const projects = useSelector((store) => store.projects.projects.projects);
  const project = projects.filter((p) => p.user_id === user.id && p.project);
  const tasks = numTasksPerProject.map((t) => t);
  const [projData, setProjData] = useState({
    labels: project.map((p)=> p.project),
    datasets: [
      {
        label: `Number of tasks per project`,
        data: tasks.map((num) => num.numOftasks), //dummy data
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 79, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  });
  const options = {
    maintainAspectRatio: false,
    legend: {
      labels: { fontSize: 26 },
    },
  };
  return <Bar  options={options} data={projData} />;
}
