import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { domain } from '../utils/utils';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchTasks, loginUser } from '../store/serverCall';

export default function Register() {
  // const {logUser, user} = useContext(Context)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState('')
  const user = useSelector(store => store?.user?.user) || null
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoad(true)
      await loginUser(data, dispatch);
      setLoad(false)
      navigate('/dashboard');
    } catch (err) {
      setLoad(false)
      setError(err.message)
    }
  };
  useEffect(() => {
    fetchProjects(user, dispatch);
    fetchTasks(user, dispatch);
  }, [user]);
  return (
    <div className="flex bg-green-250/20 w-full min-h-screen items-center justify-center flex-col">
      {error && <span>{error}</span>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-white py-4 text-center px-6 rounded-md shadow-2xl"
      >
        <h1 className="text-3xl  mb-2 text-green-950 font-semibold tracking-widest">
          Login
        </h1>
        <div className="my-6 w-full">
          <input
            className="border-2 py-2 px-5 rounded-md bg-gray-200/50 w-full placeholder:text-sm placeholder:text-gray-700/50 focus:outline-none text-lg font-sans text-green-950"
            {...register('email', { required: 'Email cannot be empty' })}
            type="email"
            // value="oluochbonfas68@gmail.com"
            placeholder="Enter your email address"
          />
          <span className="text-xs text-red-500/50">
            {errors?.email?.message}
          </span>
        </div>
        <div className="my-6 w-full">
          <input
            className="border-2 py-2 px-5 rounded-md bg-gray-200/50 w-full placeholder:text-sm placeholder:text-gray-700/50 focus:outline-none text-lg font-sans text-green-950"
            {...register('password', { required: 'Password cannot be empty' })}
            type="password"
            // value="oluoch#@123"
            placeholder="Enter your password address"
          />
          <span className="text-xs text-red-500/50">
            {errors?.password?.message}
          </span>
        </div>
        <button className="bg-green-950 py-3 px-5 rounded-md text-white hover:bg-green-950/90 transition-all duration-300 font-semibold cursor-pointer">
          {load ? `Loading...`: `Login`}
        </button>
        <p className="my-1 text-sm font-light text-gray-700 w-full">
          Don't have an account,{' '}
          <Link
            className="text-blue-900 font-semibold hover:text-blue-900/90 transition-all duration-300 "
            to="/register"
          >
            register
          </Link>
        </p>
      </form>
    </div>
  );
}
