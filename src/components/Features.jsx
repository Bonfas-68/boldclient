import React from 'react'

export default function Features() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center py-16 px-6">
        <div className=" max-w-6xl mx-auto grid grid-cols-2 gap-12">
            <div className="shadow-md  border bg-white border-gray-900/20 p-4 rounded-md">
                <h2 className="capitalize text-xl font-semibold mb-1 text-cyan-900">team collaboration</h2>
                <p className="my-4 text-gray-900/50 capitalize text-lg max-w-xl leading-loose">Check out  how to work as a team in bold task manager</p>
            </div>
            <div className="shadow-md  border bg-white border-gray-900/20 p-4 rounded-md">
                <h2 className="capitalize text-xl font-semibold mb-1 text-cyan-900">user profile</h2>
                <p className="my-4 text-gray-900/50 capitalize text-lg max-w-xl leading-loose">Get all your tasks and 
related activities together</p>
            </div>
            <div className="shadow-md  border bg-white border-gray-900/20 p-4 rounded-md">
                <h2 className="capitalize text-xl font-semibold mb-1 text-cyan-900">Available team accountability</h2>
                <p className="my-4 text-gray-900/50 capitalize text-lg max-w-xl leading-loose">See who's doing what and
quickly spot bottlenecks.</p>
            </div>
            <div className="shadow-md  border bg-white border-gray-900/20 p-4 rounded-md">
                <h2 className="capitalize text-xl font-semibold mb-1 text-cyan-900">team discussion</h2>
                <p className="my-4 text-gray-900/50 capitalize text-lg max-w-xl leading-loose">Make your work interactive by advising your teammates</p>
            </div>
        </div>
    </div>
  )
}
