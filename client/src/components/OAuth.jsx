import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../fireBase";
import { useDispatch, useNavigate } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
      useNavigate("/")
    } catch (error) {
      console.log("Could Not Signin With Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg hover:opacity-90"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}
