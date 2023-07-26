import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  useState()
  return (
    <header className="shadow-md w-full bg-white">
    <div className="max-w-2xl md:max-w-6xl mx-auto flex justify-between items-center py-3  px-4">
      <Link className="decoration-none" to="/">
        <img className='w-9' src="/light-logo.PNG" alt="" />
      </Link>
        <div className="flex space-x-6">
          <Link className="decoration-none bg-green-950 text-xl md:text-3xl text-white font-semibold py-2 cursor-pointer capitalize hover:bg-green-950/10 hover:text-green-950 transition-all duration-300 md:px-9 px-6 flex items-center justify-center rounded-full border border-white hover:border-green-950 tracking-widest " to="/login">Login</Link>
          <Link className="decoration-none hover:bg-green-950 text-xl md:text-3xl hover:text-white font-semibold py-2 cursor-pointer capitalize bg-green-200/20 text-green-950 transition-all duration-300 px-9 flex items-center justify-center rounded-full border border-white hover:border-green-950 tracking-widest " to="/register">register</Link>
        </div>
    </div>
    </header>
  )
}
