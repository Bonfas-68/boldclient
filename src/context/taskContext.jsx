// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';
// import { domain } from '../utils/utils';
// export const TaskContext = createContext();
// export const TaskProvider = ({ children }) => {
//   const [tasks, setTasks] = useState(
//     JSON.parse(localStorage.getItem('tasks')) || []
//   );

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(`${domain}/tasks`);
//       const data = await res.data;
//       setTasks((s) => ({ ...s, data }));
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   useEffect(() => {
//     fetchTasks();
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     console.log(tasks)
//   }, [tasks]);
//   return (
//     <TaskContext.Provider value={{ tasks, fetchTasks }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };
