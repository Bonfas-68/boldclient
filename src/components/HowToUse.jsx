import React from 'react'

export default function HowToUse() {
    const styles ={
        spec:{
           position:'relative',
        height:'100vh', 
        },
        specialImage:{
            position:"absolute",
            top:"50%",
            right:"-75px",
            transform:"translateY(-50%)",
            width:"100%",
            zIndex:"-1"
        },

        

    }
  return (
    <div className=" min-h-screen">
        <div style={styles.spec} className="flex  flex-row space-x-4 items-center">
            <div style={{position:"relative"}} id='special-img' className="flex-1 w-1/2 h-full">
                <img style={styles.specialImage}  src="/demo.webp" alt="" className="w-full h-auto object-cover" />
            </div>
            <div
            id="special"
            className="bg-green-950 py-6 px-12 shadow-l-xl shadow-red-900 rounded-l-md rounded h-full flex justify-center items-center flex-col  ">
                <p className="text-4xl font-semibold tracking-wide text-white leading-loose text-center max-w-xl mb-4">Complete task on time.  and manage your workload in the most effective way </p>
                <button className="py-5 px-5 bg-teal-300 text-green-950 rounded-md text-2xl font-bold capitalize tracking-wider cursor-pointer shadow-teal-100/20 shadow-xl">start now</button>
            </div>
        </div>
    </div>
  )
}
