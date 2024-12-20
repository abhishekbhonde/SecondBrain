"use client";
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("You have signed up!");
  }

  return (
    <HeroHighlight>
      <div className="h-screen w-screen flex justify-center items-center ">
        {/* Form Container with modern design */}
        <div className="bg-gray-900 bg-opacity-80 flex flex-col gap-3 text-white rounded-2xl border-2 border-gray-700 min-w-[360px] p-10 z-20 relative shadow-lg">
          <h1 className="text-center font-roboto text-4xl font-semibold text-white mb-6">
            Create Your Account
          </h1>

          <label htmlFor="username" className="text-lg font-medium">Username</label>
          <Input 
            reference={usernameRef} 
            placeholder="Enter your username" 
          
          />

          <label htmlFor="password" className="text-lg font-medium mt-1">Password</label>
          <Input 
            reference={passwordRef} 
            placeholder="Enter your password" 
            

          />

          <div className="flex justify-center pt-4">
            <Button
              onClick={signup}
              loading={false}
              variant="primary"
              text="Signup"
              fullWidth={true}
              startIcon={undefined}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
            />
          </div>

          <div className="text-center text-gray-400 mt-4">
            <p className="text-sm">Already have an account? <a href="/signin" className="text-indigo-400 hover:text-indigo-300">Sign in</a></p>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
