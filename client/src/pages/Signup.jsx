import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={(e) => handleChange(e)}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-70">
          SignUp
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an Account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">SignIn</span>
        </Link>
      </div>
    </div>
  );
}
