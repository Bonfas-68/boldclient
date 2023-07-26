import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="bg-green-950 px-4 py-2">
        <div className="flex items-center flex-row max-w-6xl mx-auto justify-between ">
            <Link to="/" className='decoration-none'>
            <img src="/dark-logo.PNG" alt="" className="w-12 md:w-16 " />
        </Link>
        <div className="text-white text-lg md:text-xl font-medium capitalize tracking-wider">
            bold task manager &copy; 2023
        </div>
        </div>
        
    </div>
  )
}
