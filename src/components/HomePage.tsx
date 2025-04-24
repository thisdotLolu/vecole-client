'use client'
import React, { useEffect, useState } from 'react'

function HomePage() {
    const [role,setRole] = useState<string | null>('')
    const [email,setEmail] = useState<string | null>('')
    useEffect(()=>{
        if(typeof window !== 'undefined'){
            const localStEmail = window.localStorage.getItem('email');
            const localStRole = window.localStorage.getItem('role');
            setRole(localStRole)
            setEmail(localStEmail)
        }
    },[role,email])
    return (
    <div className='w-full p-[20px]'>
     <p className='text-[3rem] font-bold'>Hello, {email}</p>
     <p className='text-[2rem]'>You're signed in as a {role}</p>
    </div>
  )
}

export default HomePage