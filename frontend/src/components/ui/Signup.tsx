import React, { useRef, useState } from 'react'
import { Input } from './Input'
import Button from './Button'
import { BACKEND_URL } from '../../config'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill out both fields.");
            return;
        }

        setLoading(true);

        try {
            await axios.post(BACKEND_URL + "api/v1/signup", {
                username,
                password
            });
            navigate("/")
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-gray-200'>
            <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-sm'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                    Create an Account
                </h2>

                <Input
                    reference={usernameRef}
                    placeholder="Enter your email"

                />
                <Input
                    reference={passwordRef}
                    placeholder="Enter your password"
              
                />

                <div className='flex justify-center'>
                    <Button
                        onClick={handleSignup}
                        varient='primary'
                        size='lg'
                        text={loading ? "Signing up..." : "Sign Up"}
                        fullwidth={true}
                
                    />
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <a href="/signin" className="text-indigo-600 hover:underline">Sign in</a>
        </div>
            </div>
        </div>
    )
}

export default Signup;
