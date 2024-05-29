import React from "react";
import {Link} from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl text-center font-semibold my-7">Sign Up</h1>

      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-70">SignUp</button>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an Account ?</p>
        <Link to={"/signin"}><span className="text-blue-700">SignIn</span></Link>
      
      </div>
    </div>
  );
}
