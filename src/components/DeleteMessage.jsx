import React from 'react';

export default function DeleteMessage() {
  return (
    <div className="flex bg-white items-center p-6 max-w-sm mx-auto shadow-lg rounded-xl space-x-4 mt-12">
      <img
        className="rounded-full border-4 border-red-500/20 animate-bounce w-12 h-12"
        src={img2}
        alt=""
      />
      <div className="">
        <h4 className="text-xl text-yellow font-medium">Are you sure?</h4>
        <p className="text-slate-500">You have deleted a post</p>
      </div>
    </div>
  );
}
