import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashNavbar from '../components/DashNavbar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative flex flex-col justify-start md:justify-start items-end  md:items-end pt-20  w-full  h-screen">
      <div className="absolute z-20 top-0 left-0 inset-x-0  bg-teal-950 ">
        <DashNavbar setShowMenu={setShowMenu} showMenu={showMenu}/>
      </div>
      {showMenu && (
        <div className="absolute top-14 z-20 left-0 inset-y-0 max-h-full md:w-64 w-24 transition-all duration-1000 ease-in-out bg-green-950">
          <Sidebar />
        </div>
      )}

      <div className="w-full mx-auto h-max    overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
