import React, { useRef, useState } from 'react';
import { Input } from './Input';
import Button from './Button';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Sign-in handler
  async function handleSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please fill out both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(BACKEND_URL + "api/v1/signin", {
        username,
        password
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/")
      }
      
    } catch (error: any) {
      console.error("Error signing in:", error);
      alert(error.response?.data?.message || "Signin failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-200'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-sm'>
        
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Sign In to Your Account
        </h2>
        
        <Input placeholder="Enter your email" reference={usernameRef} />
        <Input placeholder="Enter your password" reference={passwordRef}  />
        
        <div className='flex justify-center'>
          <Button 
            varient='primary' 
            size='lg' 
            text={loading ? "Signing in..." : "Sign In"} 
            fullwidth={true} 
            onClick={handleSignin} 
            
          />
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? 
          <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default Signin;
