import React from 'react'
import { Input } from './Input'
import Button from './Button'

const Signin = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='bg-slate-100 p-6 rounded-md '>
            <Input placeholder="Enter your email" />
            <Input placeholder="Enter your password"/>

            <div className='flex justify-center items-center'>
            <Button varient='primary' size='lg' text={"Sign in"} fullwidth={true}/>
            </div>
        </div>
    </div>
  )
}

export default Signin
