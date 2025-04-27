"use client";

import axios from "axios";
import React, { useRef } from "react";

const LogIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleOnClick = async () => {
    const response = await axios.post("http://localhost:8000/login", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
    localStorage.setItem("token", response.data.token);
    console.log(response, "response");
  };

  return (
    <div className="flex flex-col gap-4 w-[200px]">
      <input
        ref={emailRef}
        className="p-2 border border-white"
        type="email"
        placeholder="Type your email..."
      />
      <input
        ref={passwordRef}
        className="p-2 border border-white"
        type="password"
        placeholder="Type your password..."
      />
      <button
        onClick={handleOnClick}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LogIn;
