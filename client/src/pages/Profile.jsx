import React from 'react'
import {useSelector} from "react-redux"


export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='h-24 w-24 self-center mt-2 rounded-full object-cover hover:cursor-pointer' src={currentUser.avatar} alt="profile" />

        <input type="text"
        placeholder="Username"
        className='border p-3 rounded-lg'
        id='username'
         />
        <input type="email"
        placeholder="Email"
        className='border p-3 rounded-lg'
        id='email'
         />
        <input type="password"
        placeholder="Password"
        className='border p-3 rounded-lg'
        id='password'
         />
         <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex mt-5 justify-between'>
        <span className='text-red-700 hover:cursor-pointer'>Delete Account</span>
        <span className='text-red-700 hover:cursor-pointer'>SignOut</span>
      </div>
    </div>
  )
}
