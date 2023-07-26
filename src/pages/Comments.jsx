import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { domain } from '../utils/utils';
import { useSelector } from 'react-redux';

export default function Comments() {
  const user = useSelector((store) => store.user.user);
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(true);
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${domain}/comments`, {
        headers: { Authorization: `${user.token}` },
      });
      const data = await res.data;
      setLoad(true);
      setComments(data);
      setLoad(false);
    } catch (error) {
      alert(error.message);
    }
  };
  const comms = comments.filter((c)=> c.user_id === user.id)

  useEffect(() => {
    fetchComments();
  }, [comments]);
  return (
    <div className="relative w-full md:w-full h-max overflow-y-auto overflow-x-hidden">
      <h2 className="sticky top-0 left-0 w-full bg-slate-950 z-5 shadow-2xl text-2xl text-center font-medium p-2 text-zinc-200 capitalize">
      Team Conversations
      </h2>
      <div className="bg-white w-full px-3 text-center p-4">
        {load ? (
          <div className="w-max mx-auto">
            <img
              className="w-10 h-10 my-1"
              src="/loading.svg"
              alt="loader image"
            />
            <span className="text-sm text-yellow-500 font-semibold capitalize">
              no comments yet
            </span>
          </div>
        ) : (
          comms.map((com) => (
            <div key={com.id} className="w-full mb-2  text-teal-950 text-sm">
              
                <div className='relative w-max shadow-md p-2 rounded-md'>
                <em className='mt-2'>{user.id === com.user_id && com.comment}</em>
                <div className="flex flex-row items-center justify-end gap-x-2 mt-2"> <p className='bg-green-600 block w-max h-max p-[2px] text-white font-extralight rounded-full uppercase text-xs'>{user.id === com.user_id && user.name.slice(0,2)} </p><span className='text-xs text-ellipsis'>{}</span></div>
               
                </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}
