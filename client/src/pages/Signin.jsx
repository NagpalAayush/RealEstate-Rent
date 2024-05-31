import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signinFailure,
  signinStart,
  signinSuccess,
} from "../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(signinFailure(data.message));
      return;
    }
    dispatch(signinSuccess(data));
    navigate("/");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading...." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Dont Have an Account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">SignUp</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
