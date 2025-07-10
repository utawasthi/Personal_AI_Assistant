"use client"
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {

  const {user} = useContext(AuthContext);

  if(user) console.log('user from header component' , user);

  return (
    <div className = 'flex justify-between p-3 px-6 items-center shadow-sm'>
      <Image 
        src = {'/logo.svg'}
        alt = 'logo'
        width = {50}
        height = {50}
      />

      {user?.picture && <Image 
        src = {user?.picture}
        alt = 'user'
        width = {40}
        height = {40}
        className = 'rounded-full'
      />}
    </div>
  )
}

export default Header
