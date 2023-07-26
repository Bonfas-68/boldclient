import React, { useContext, useState } from 'react';
import { domain, validateFile } from '../utils/utils';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchTasks, fetchUser } from '../store/serverCall';

export default function UpdateProfile() {
  const user = useSelector(store=>store.user.user)
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (!file) {
      alert('Please select an image');
    } else {
      try {
        validateFile(file);
        let image = Date.now() + file.name;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('bio', data.bio);
        formData.append('company', data.company);
        formData.append('role', data.role);
        formData.append('image', image);
        formData.append('file', file);
        const res = await axios.put(`${domain}/users/${user.id}`,
          formData,{
          headers:{Authorization: `${user.token}`}
        });
        reset();
        navigate('/dashboard/profile');
        fetchUser(user, dispatch)
        fetchProjects(user, dispatch)
        fetchTasks(user, dispatch)
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <form
      className="shadow-2xl rounded-2xl p-6 ml-24 md:w-[70%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" mx-auto rounded-full shadow-2xl py-5 px-5 bg-green-950/50  ">
        <input
          className="update_input"
          placeholder="Upload your photo"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="group mb-2  flex flex-col leading-8 py-1">
        <label className="text-lg mb-1 font-light tracking-wide" htmlFor="name">
          Enter name
        </label>
        <input
          className="update_input"
          placeholder="Enter name e.g Bonfas oluoch"
          type="text"
          {...register('name', { required: 'name is required' })}
        />
        <p>{errors.message}</p>
      </div>
      <div className="group mb-2  flex flex-col leading-8 py-1">
        <label
          className="text-lg mb-1 font-light tracking-wide"
          htmlFor="email"
        >
          Enter email
        </label>
        <input
          className="update_input"
          placeholder="e.g example@gmail.com"
          type="email"
          {...register('email', { required: 'email is required' })}
        />
        <p>{errors.message}</p>
      </div>
      <div className="group mb-2  flex flex-col leading-8 py-1">
        <label
          className="text-lg mb-1 font-light tracking-wide"
          htmlFor="company"
        >
          Enter company
        </label>
        <input
          className="update_input"
          placeholder="Enter Company e.g chatcon"
          type="text"
          {...register('company', { required: 'company is required' })}
        />
        <p>{errors.message}</p>
      </div>
      <div className="group mb-2  flex flex-col leading-8 py-1">
        <label className="text-lg mb-1 font-light tracking-wide" htmlFor="role">
          Enter role
        </label>
        <input
          className="update_input"
          placeholder="e.g Junior developer"
          type="text"
          {...register('role', { required: 'role is required' })}
        />
        <p>{errors.message}</p>
      </div>
      <div className="group mb-2  flex flex-col leading-8 py-1">
        <label className="text-lg mb-1 font-light tracking-wide" htmlFor="bio">
          Enter bio
        </label>
        <textarea
          className="bg-gray-900/10 focus:outline-none text-md text-green-950/90 px-3 py-1 rounded-md resize-none"
          {...register('bio', { required: 'bio is required' })}
        ></textarea>
      </div>

      <button className="bg-green-950 rounded-md py-2 px-5 text-white font-semibold  tracking-wide cursor-pointer hover:bg-green-950/90 transition-all duration-300">
        Update
      </button>
    </form>
  );
}
