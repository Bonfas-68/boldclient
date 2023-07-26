
import { useContext } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
// import AddProject from './features/AddProject'
import AddProject from './pages/AddProject'
import Login from './features/Login'
import Register from './features/Register'
import Analysis from './pages/Analysis'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import DefaultHome from './pages/DefaultHome'
import Home from './pages/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import { Context } from './context/userContext'
import Task from './pages/Task'
import UpdateProfile from './pages/UpdateProfile'
import Project from './pages/Project'
import { useSelector } from 'react-redux'
import AddTasks from './features/AddTasks'
import Teams from './pages/Teams'
// import UpdateTas from './pages/UpdateTas'


function App() {
  // // const {user} = useContext(Context)
  // const user = useSelector((store)=> store.user.user)
  // const task = useSelector((store)=> store.tasks.tasks)
  // console.log(task,  user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register /> } />
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route index element={<DefaultHome />} />
          <Route path='/dashboard/add' element={<AddProject /> } />
          <Route path='/dashboard/addTask' element={<AddTasks /> } />
          <Route path='/dashboard/analysis' element={<Analysis />} />
          <Route path='/dashboard/teams' element={<Teams />} />
          <Route path="/dashboard/profile" element={<Profile />}>
            <Route path="/dashboard/profile/update" element={<UpdateProfile />} />
          </Route>
          <Route path="/dashboard/projects" element={<Projects />}>
            <Route path="/dashboard/projects/add" element={<AddProject />} />
          </Route> 
          <Route path="/dashboard/projects/:id" element={<Project />} />
          <Route path="/dashboard/tasks" element={<Tasks />}>
            <Route path=':id' element={<Task />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
