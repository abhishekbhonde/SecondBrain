"use client";
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export function Signup() {
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
    <HeroHighlight containerClassName="bg-gray-900">
      <div className="h-screen w-screen flex justify-center items-center">
        {/* Dark-themed form background */}
        
        <div className="bg-gray-800 flex flex-col gap-2 text-white rounded-xl border min-w-48 p-8 z-20 relative">
            <h1 className="text-center font-roboto pb-6 font-md text-[30px]">Signup Here</h1>
            <label htmlFor="username">Enter your username</label>
            <Input  reference={usernameRef} placeholder="Username" />
            <label htmlFor="username">Enter your password</label>
          <Input reference={passwordRef} placeholder="Password" />
          <div className="flex justify-center pt-10">
            <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} startIcon={undefined} />
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
