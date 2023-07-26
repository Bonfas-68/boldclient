import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchTasks, logoutUser } from '../store/serverCall';
import { logout } from '../store/userSlice';
import { FaHamburger } from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { domain } from '../utils/utils';

export default function DashNavbar({ showMenu, setShowMenu }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('user')
    logout(user);
    navigate('/');
  };
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    fetchProjects(user, dispatch);
    fetchTasks(user, dispatch);
  }, []);
  return (
    <div className="flex flex-row justify-between py-2 px-6  items-center w-full">
      {showMenu ? (
        <IoMdClose
          className="text-gray-100 text-4xl cursor-pointer"
          onClick={() => handleShowMenu()}
        />
      ) : (
        <IoMdMenu
          className="text-gray-100 text-4xl cursor-pointer"
          onClick={() => handleShowMenu()}
        />
      )}
      {/*  */}

      <div className="flex gap-x-6 items-center">
        <img src="/notification.png" alt="" className="w-7 h-7" />
        <button
          className="md:py-2 px-4 md:px-4 text-lg md:text-xl text-green-950 font-medium tracking-wider capitalize bg-white rounded-full"
          onClick={() => handleLogout()}
        >
          logout
        </button>
        <p className="md:text-2xl text-lg text-white font-light md:tracking-widest capitalize">
          {user?.name}
        </p>
        <Link to="/dashboard/profile/update">
          <img
            src={user.image === null ? `/user.jpg` : `${domain}/uploads/${user.image}`}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
