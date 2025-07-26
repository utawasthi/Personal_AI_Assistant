"use client"

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from '@/services/Faqs';
import ImageSlider from './_components/ImageSlider';
import Footer from './_components/Footer';
import { featuresList, freePlan, proPlan } from '@/services/Features';
import CheckMark from './_components/CheckMark';


function SignIn() {
  const router = useRouter();
  const CreateUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newOpacity = Math.max(1 - scrollTop / 400, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
    <div className = 'relative h-screen overflow-y-scroll scrollbar-hide'>
      <div
        className="fixed top-0 left-0 w-full h-[100vh] -z-10 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('/bg-home2.jpg')",
          opacity: opacity,
        }}
      />
      <div className="grid grid-cols-10 min-h-screen bg-white dark:bg-black/65 transition-colors">
        <div 
          className="col-span-10 lg:col-span-5 flex flex-col items-center min-h-screen p-8 bg-white dark:bg-black/40"
        >
          <div 
           className = 'flex items-center justify-center gap-4 mb-20'
          >
            <Image
              src="/orbit.png"
              alt="Orbit Mind Logo"
              width={30}
              height={30}
              className="dark:invert h-[60px] w-[60px]"
            />
            <h2 className = 'text-3xl'>
              <span className = 'dark:text-cyan-400'>O</span>rbit <span className = 'dark:text-cyan-400'>M</span>ind
            </h2>
          </div>
          <div className = 'flex flex-col items-center justify-center dark:text-white/90 mt-20 mb-10 font-mono font-light'>
              <p className = 'text-5xl'>
                <span className = 'dark:text-cyan-300 font-medium'>O</span>rbit Mind remembers,so
                you don't have to!
              </p>
              <p className = 'text-xl font-light dark:text-cyan-300'>
                Where every assistant is smarter than your group chat.
              </p>
          </div>
          <div className = 'mt-10'>
            <Button
              className="w-full flex justify-between bg-black text-white dark:bg-cyan-400/20 backdrop-blur-md dark:border dark:border-white/20 dark:text-white hover:bg-gray-900 dark:hover:bg-cyan-400/30 transition py-6 rounded-2xl px-10 cursor-pointer"
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
          className = 'col-span-5 h-screen'
        >
          <ImageSlider/>
        </div>
      </div>
      <div className = 'flex flex-col w-full items-center gap-6 p-2 dark:bg-black/65 px-6'>
       <div className = 'flex flex-col w-full items-center gap-6'>
          <div 
            className = 'text-4xl mt-2 tracking-wider font-sans text-center'
          >
            <span className = 'text-cyan-300'>Me</span>et <span className = 'text-cyan-300'>Or</span>bit <span className = 'text-cyan-300'>Mi</span>nd
          </div>
          <div 
            className = 'font-light tracking-wide text-xl text-center'
          >
            Orbit Mind is a next-generation AI workspace built to be intelligent, contextual, and collaborative — helping you think better, write faster, and organize effortlessly.
          </div>
       </div>
       <div className="w-full overflow-hidden">
          {featuresList.map((f, ind) => (
            <div 
              key = {ind}
              className = 'border-b-1 p-3' 
            >
              <Accordion type = 'single' collapsible>
                <AccordionItem value={`${ind}`}>
                  <AccordionTrigger className="text-xl cursor-pointer dark:text-cyan-400">
                    {f.feature}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg cursor-pointer font-light">
                    {f.content}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
      <div className = 'bg-black/70 p-5'>
        <div className = 'text-center text-3xl font-mono my-5'>
          <span className = 'text-cyan-300'>Exp</span>lore <span className = 'text-cyan-300'>Pla</span>ns
        </div>
        <div className = 'grid grid-cols-2 min-h-screen'>
          <div className = 'col-span-2 md:col-span-1'>
            <div className = 'flex flex-col gap-2 p-6'>
              <div className = 'mb-3'>
                <h1 className = 'text-2xl font-semibold text-cyan-500 tracking-wider'>Free</h1>
                <h2 className = 'font-medium text-gray-300'>Try Orbit Mind</h2>
              </div>
              <div className = 'flex flex-col gap-3 justify-center'>
                {
                  freePlan?.map((f , ind) => (
                    <div key = {ind}>
                      {
                        <div className = 'flex gap-4 justify-start items-center'>
                          <CheckMark/>
                          <div className = 'font-light tracking-wide'>
                            {f}
                          </div>
                        </div>
                      }
                    </div>
                  ))
                }
              </div>
              <div className = 'mt-3 p-1'>
                <div className = 'font-bold text-2xl'>$0</div>
                <div className = 'text-sm font-light tracking-wide'>Free for everyone</div>
              </div>
            </div>
          </div>
          <div className = 'col-span-2 md:col-span-1'>
           <div className = 'flex flex-col gap-2 p-6'>
              <div className = 'mb-3'>
                <h1 className = 'text-2xl font-semibold text-cyan-500 tracking-wider'>Pro</h1>
                <h2 className = 'font-medium text-gray-300'>For everyday productivity</h2>
              </div>
              <div className = 'font-light tracking-wide'>
                Everything in Free , plus : 
              </div>
              <div className = 'flex flex-col gap-3 justify-center'>
                {
                  proPlan?.map((f , ind) => (
                    <div key = {ind}>
                      {
                        <div className = 'flex gap-4 justify-start items-center'>
                          <CheckMark/>
                          <div className = 'font-light tracking-wide'>
                            {f}
                          </div>
                        </div>
                      }
                    </div>
                  ))
                }
              </div>
              <div className = 'mt-3 p-1'>
                <div className = 'font-bold text-2xl'>$10</div>
                <div className = 'text-sm font-light tracking-wide'>Per month billed monthly</div>
              </div>
            </div>
          </div>
       </div>
       <div className = 'text-center text-sm font-light text-zinc-200 md:-mt-20'>
        * Prices shown do not include applicable tax. 
        <span className = 'underline ml-2 text-cyan-300'>Usage limits apply.</span>
       </div>
      </div>
      <div className = 'flex flex-col justify-center p-10 dark:bg-black/70'>
        <h1 
         className = 'text-center text-3xl font-light font-sans tracking-wide'
        >
          <span className = 'text-cyan-300'>Fre</span>quently asked questions
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
                       className = 'text-xl cursor-pointer dark:text-cyan-400'
                      >
                        {q.question}
                      </AccordionTrigger>
                      <AccordionContent
                        className = 'text-lg cursor-pointer font-light'
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
      <div className = 'relative mt-50'>
        <Footer/>
      </div>
    </div>
  );
}

export default SignIn;