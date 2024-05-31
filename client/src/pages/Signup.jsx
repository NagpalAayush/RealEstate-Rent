import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    } else {
      setLoading(false);
      setError(null);
      navigate("/signin");
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
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Loading...." : "SignUp"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an Account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">SignIn</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
