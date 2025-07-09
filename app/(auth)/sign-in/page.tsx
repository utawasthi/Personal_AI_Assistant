"use client"

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function SignIn() {
  
  const router = useRouter();

  const CreateUser = useMutation(api.users.CreateUser);
  const {user , setUser} = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      if(typeof window !== undefined){
        localStorage.setItem('user_token' , tokenResponse.access_token);
      }
      
      const user = await GetAuthUserData(tokenResponse.access_token);
      // console.log("user info from google sign-in" , user);
      const result = await CreateUser({
        name : user?.name,
        email : user?.email,
        picture : user?.picture,
      });
      // console.log("result of user created" , result);
      setUser(result);
      router.replace('/ai-assistants');
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div className = 'flex flex-col items-center justify-center h-screen gap-10'>
      <div className = 'flex flex-col gap-10 items-center justify-center p-10 border border-gray-200 rounded-4xl shadow-2xl'>
        <Image 
          src = {'/logo.svg'}
          alt = 'logo'
          width = {100}
          height = {100}   
        />
        <div className = 'font-semibold tracking-wide text-gray-700 text-2xl'>
          Sign In To Perosnal AI Assistant & Agent
        </div>
        <Button 
          className = 'p-6 cursor-pointer'
          onClick = {() => googleLogin()}
        >
          Sign In With GMail
        </Button>
      </div>
    </div>
  )
}

export default SignIn
