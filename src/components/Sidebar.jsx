import React from 'react'
import { FaFacebook, FaHome, FaLinkedinIn, FaPlusCircle, FaTasks, FaTelegram, FaTwitter, FaUserCircle} from 'react-icons/fa'
import {AiOutlineFundProjectionScreen, AiOutlineTeam} from 'react-icons/ai'
import {IoMdAnalytics} from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full py-2  gap-y-4 justify-between">
    <div className="flex flex-col justify-center self-center  w-full group">
      <NavLink to="/dashboard/"  className={({isActive})=> isActive ? "bg-emerald-100/100 nav_link":"nav_link text-white"}>
        <FaHome className="nav_icon"/>
        <span className="md:text-xl text-sm font-light  md:font-medium tracking-wider">Home</span>
      </NavLink>
      <NavLink to="/dashboard/tasks"  className={({isActive})=> isActive ? "text-green-950 bg-emerald-100/100 nav_link":"nav_link text-white"}>
        <FaTasks className="nav_icon"/>
        <span className="md:text-xl text-sm  md:font-medium font-light tracking-wider">MyTasks</span>
      </NavLink>
      <NavLink to="/dashboard/profile"  className={({isActive})=> isActive ? "text-green-950 bg-emerald-100/100 nav_link":"nav_link text-white"}>
        <FaUserCircle className="nav_icon"/>
        <span className="md:text-xl text-sm  md:font-medium font-light tracking-wider">Profile</span>
      </NavLink>
      <NavLink to="/dashboard/projects"  className={({isActive})=> isActive ? "bg-emerald-100/100 text-green-950 nav_link":"nav_link text-white"}>
        <AiOutlineFundProjectionScreen className="nav_icon"/>
        <span className="md:text-xl text-sm  md:font-medium font-light tracking-wider">Projects</span>
        
      </NavLink>
      <NavLink to="/dashboard/analysis"  className={({isActive})=> isActive ? "bg-emerald-100/100 nav_link text-green-950":"nav_link text-white"}>
        <IoMdAnalytics className=" nav_icon"/>
        <span className="md:text-xl text-sm  md:font-medium font-light tracking-wider ">Analysis</span>
      </NavLink>
      <NavLink to="/dashboard/teams"  className={({isActive})=> isActive ? "bg-emerald-100/100 nav_link text-green-950":"nav_link text-white"}>
        <AiOutlineTeam  className="nav_icon"/>
        <span className="md:text-xl text-sm  md:font-medium font-light tracking-wider">Teams</span>
      </NavLink>

      
    </div>
      {/* Dashboard footer  */}
    <div className="max-w-full mx-auto flex flex-col gap-y-4 mt-4 justify-between px-4">
        <h2 className="font-light md:text-xl text-xs text-white md:tracking-widest tracking-wide capitalize text-center leading-4">bold task manager &copy; 2023</h2>
        <div className="flex md:flex-row flex-col md:justify-between items-center w-full md:gap-x-2 gap-y-2  min-w-full  px-4 md:my-2">
          <Link className='decoration-none' to="https://facebook.com">
          <FaFacebook className='md:text-3xl text-xl hover:text-[#1877f2] transition-all duration-300 text-green-200' />
          </Link>
          <Link className='decoration-none' to="https://twitter.com">
          <FaTwitter className='md:text-3xl text-xl hover:text-[#1da1f2] transition-all duration-300 text-green-200' />
          </Link>
          <Link className='decoration-none' to="https://linkedin.com">
          <FaLinkedinIn className='md:text-3xl text-xl hover:text-[#0a66c2] transition-all duration-300 text-green-200' />
          </Link>
          <Link className='decoration-none' to="https://telegram.com">
          <FaTelegram className='md:text-3xl text-xl hover:text-[#0088cc] transition-all duration-300 text-green-200' />
          </Link>
          
          
          
        </div>
      </div>
    </div>
  )
}
