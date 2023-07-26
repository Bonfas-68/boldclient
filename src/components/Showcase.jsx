export default function Showcase(){
    return(
        <div className="w-full p-6">
            <div className="max-w-6xl mx-auto py-12 flex flex-row gap-6 h-[90vh]">
                <div className="flex-1 self-center ">
                <img src="/tasks.webp" className='w-100 h-100 ' alt="" />
                </div>
                <div className="self-center flex-1 py-2 px-2 ">
                    <h1 className=" text-balance text-5xl leading-24 text-green-950 tracking-wide font-bold mb-6 capitalize">
                    Welcome to Bold Task 
                    manager web app
                    </h1>
                    <p className="text-xl text-gray-700 text-left line-2 max-w-md mb-6 leading-loose">Get more done with task management software that lets you organize, discuss, and track all work in one place.</p>
                    <button className="py-3 text-lg px-5 bg-green-950 text-white font-semibold tracking-wider rounded-md">Get Started</button>
                </div>
            </div>
        </div>
    )
}
import React from 'react'


