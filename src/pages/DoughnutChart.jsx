import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJs.register(Tooltip, Legend, ArcElement);

export default function DoughnutChart() {
  const user = useSelector(store=> store.user.user)
  const tasks = useSelector((store) => store.tasks.tasks);
  const [d, setData] = useState([]);
  useEffect(() => {
    const task = tasks.map((t) => {
      const complete = tasks.filter((t) => t.user_id === user.id &&  t.status === 'Done').length;
      const incomplete = tasks.filter((t) => t.user_id === user.id &&  t.status === 'To-do').length;
      const inProgress = tasks.filter((t) => t.user_id === user.id &&  t.status === 'Doing').length;
      let count = [complete, incomplete, inProgress];
      setData(count);
    });
  }, []);

  const data = {
    labels: ['Done', 'To-do', 'Doing'],
    datasets: [
      {
        label: ` Number of tasks`,
        data: d,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 79, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  //   console.log(data);
  const options = {
    maintainAspectRatio: false,
    legend: {
      labels: { fontSize: 26 },
    },
  };
  return <Doughnut data={data} options={options}  />;
}
