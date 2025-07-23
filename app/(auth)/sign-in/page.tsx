"use client"

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from '@/services/Faqs';

function SignIn() {
  const router = useRouter();
  const CreateUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== undefined) {
        localStorage.setItem('user_token', tokenResponse.access_token);
      }

      const user = await GetAuthUserData(tokenResponse.access_token);
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });

      setUser(result);
      router.replace('/ai-assistants');
    },
    onError: errorResponse => console.error(errorResponse),
  });

  return (
    <div className = 'overflow-y-auto scrollbar-hide'>
      <div className="grid grid-cols-10 min-h-screen bg-white dark:bg-[#0a0f0f] transition-colors overflow-hidden">
        <div 
          className="col-span-10 lg:col-span-5 flex flex-col items-center min-h-screen p-8 bg-white dark:bg-[#111]"
        >
          <div className = 'flex items-center justify-center gap-4 mb-20'>
            <Image
              src="/logo.svg"
              alt="Orbit Mind Logo"
              width={30}
              height={30}
              className="dark:invert h-[40px] w-[40px]"
            />
            <h2 className = 'text-3xl'>
              Orbit Mind
            </h2>
          </div>
          <div className = 'dark:text-white/90 mt-20 mb-10'>
              <p className = 'text-5xl'>
                <span className = 'dark:text-cyan-300 font-medium'>O</span>rbit Mind remembers,
                <br/>
                so you don't have to!
              </p>
              <p className = 'text-xl font-light dark:text-cyan-300'>
                Where every assistant is smarter than your group chat.
              </p>
          </div>
          <div className = 'mt-10'>
            <Button
              className="w-full flex justify-between bg-black text-white dark:bg-cyan-400/95 dark:text-black hover:bg-gray-900 dark:hover:bg-cyan-500 transition py-6 rounded-xl px-10 cursor-pointer"
              onClick={() => googleLogin()}
            >
              <Image
                src = {'/google.png'}
                alt = 'google'
                height = {30}
                width = {30}
                className = 'h-[25px] w-[25px]'
              />
              <p>Continue with Google</p>
            </Button>
          </div>
        </div>
        <div
          className = 'col-span-5'
        >
          Hi
        </div>
      </div>
      <div className = 'flex flex-col justify-center px-10 m-10'>
        <h1 
         className = 'text-center text-3xl font-light font-sans tracking-wide'
        >
          Frequently asked questions
        </h1>
        <div className = 'mt-5'>
          <Accordion type="single" collapsible>
            {
              faqs.map((q) => (
                <div 
                  key = {q.id}
                  className = 'p-2'
                >
                   <AccordionItem value = {q.id}>
                      <AccordionTrigger
                       className = 'text-xl cursor-pointer dark:text-cyan-400/90'
                      >
                        {q.question}
                      </AccordionTrigger>
                      <AccordionContent
                        className = 'text-lg cursor-pointer'
                      >
                        {q.content}
                      </AccordionContent>
                    </AccordionItem>
                </div>
              ))
            }
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default SignIn;