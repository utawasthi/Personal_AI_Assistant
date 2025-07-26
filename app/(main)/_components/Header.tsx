"use client"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'
import UserAccount from './UserAccount';

function Header() {

  const {user} = useContext(AuthContext);

  return (
    <div className = 'flex justify-between p-3 px-6 items-center shadow-sm'>
      <div className = 'flex justify-start items-center gap-10'>
        <Image 
          src = {'/orbit.png'}
          alt = 'logo'
          width = {60}
          height = {60}
        />
        <h2 className = 'text-3xl font-bold tracking-wide '>Orbit Mind</h2>
      </div>

      <UserAccount>
        <Image
          src = {user?.picture!}
          alt="User"
          width={80}
          height={80}
          className= "rounded-full h-[40px] w-[40px]"
        />
      </UserAccount>
    </div>
  )
}

export default Header
