"use client";
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <HeroHighlight>
      <div className="h-screen w-screen flex justify-center items-center ">
        {/* Form Container with modern design */}
        <div className="bg-gray-900 bg-opacity-80 flex flex-col gap-3 text-white rounded-2xl border-2 border-gray-700 min-w-[360px] p-10 z-20 relative shadow-lg">
          <h1 className="text-center font-roboto text-4xl font-semibold text-white mb-6">
            Welcome Back
          </h1>

          <label htmlFor="username" className="text-lg font-medium">Username</label>
          <Input
            reference={usernameRef}
            placeholder="Enter your username"
           
          />

          <label htmlFor="password" className="text-lg font-medium mt-4">Password</label>
          <Input
            reference={passwordRef}
            placeholder="Enter your password"
            
          />

          <div className="flex justify-center pt-8">
            <Button
              onClick={signin}
              loading={false}
              variant="primary"
              text="Signin"
              fullWidth={true}
             
            />
          </div>

          <div className="text-center text-gray-400 mt-4">
            <p className="text-sm">Don't have an account? <a href="/signup" className="text-indigo-400 hover:text-indigo-300">Sign up</a></p>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
