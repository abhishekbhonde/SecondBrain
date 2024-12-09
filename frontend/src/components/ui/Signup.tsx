import React, { useRef } from 'react'
import { Input } from './Input'
import Button from './Button'
import { BACKEND_URL } from '../../config'
import axios from "axios"
const Signup = () => {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();


        async function Signup() {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            await axios.post(BACKEND_URL + "/api/v1/signup",{
                username,
                password    
            })
            alert("you have signup")

        }
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='bg-slate-100 p-8 rounded-md '>
            <Input reference={usernameRef} placeholder="Enter your email" />
            <Input reference={passwordRef} placeholder="Enter your password"/>

            <div className='flex justify-center items-center pt-4 text-center'>
            <Button onClick={Signup} varient='primary' size='lg' text={"Signup"} fullwidth={true}/>
            </div>
        </div>
    </div>
  )
}

export default Signup
