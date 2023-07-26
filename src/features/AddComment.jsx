import React, { useContext } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { domain } from '../utils/utils';
import { Context } from '../context/userContext';
import { useSelector } from 'react-redux';

export default function AddComment() {
  // const {user} = useContext(Context)
  const user = useSelector((store) => store.user.user);
  const { handleSubmit, register, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${domain}/comments`,
        { user_id: user.id, ...data },
        { headers: { Authorization: `${user.token}` } }
      );
      const msg = res.data;
      console.log(res);
      reset();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" overflow-hidden flex flex-row w-full md:w-full md:col-span-2"
    >
      <input
        type="text"
        {...register('comment')}
        className="w-full  border-0 bg-white text-lg placeholder:text-lg placeholder:capitalize placeholder:text-gray-500/50 md:px-4 md:py-2 focus:outline-none text-teal-950"
        placeholder="add your comments here"
      />
      <button>
        <AiOutlineSend className="md:text-4xl text-2xl font-bold cursor-pointer h-full bg-white w-16  text-sky-900 " />
      </button>
    </form>
  );
}
