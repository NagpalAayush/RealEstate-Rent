import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireBase";

export default function Profile() {
  //functionality Requirments
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [filePer, setFilePer] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //Handeling Image Upload to FireBase
  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  //return
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          className="h-24 w-24 self-center mt-2 rounded-full object-cover hover:cursor-pointer"
          src={  formData.avatar ||currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />

        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error uploading your Image</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePer}%`}</span>
          ) : filePer == 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : null}
        </p>

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
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex mt-5 justify-between">
        <span className="text-red-700 hover:cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 hover:cursor-pointer">SignOut</span>
      </div>
    </div>
  );
}
