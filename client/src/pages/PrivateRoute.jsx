import React from "react";
import Profile from "./Profile.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }),
    [currentUser, navigate];

  return currentUser ? <Profile /> : null;
}
