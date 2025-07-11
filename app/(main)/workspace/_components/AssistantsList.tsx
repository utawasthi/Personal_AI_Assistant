"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { AssistantType } from '../../ai-assistants/page';
import Image from 'next/image';
import { AssistantContext } from '@/context/AssistantContext';
import { div } from 'motion/react-client';
import { BlurFade } from '@/components/magicui/blur-fade';

function AssistantsList() {

  const [assistantList , setAssistantList] = useState<AssistantType[]>();

  const {user} = useContext(AuthContext);
  const {assistant , setAssistant} = useContext(AssistantContext);
  const convex = useConvex();

   useEffect(() => {
      user &&  GetUserAssistants();
    } , [user , assistant == null]);
  
    const GetUserAssistants = async () => {
      const result = await convex.query(api.userAiAssistants.GetAllUserAssistants , {
        uid : user?._id as Id<"users">,
      });
      console.log("from assistant list component" , result);
      setAssistantList(result);
    }

  return (
    <div 
      className = 'p-5 bg-secondary border-r-[0.5px] h-screen relative'
    >
      <h2 className = 'font-semibold text-md'>
        Your Personal AI Assistants
      </h2>
      <Button className = 'w-full mt-3 text-sm font-medium cursor-pointer'>
        + Add New Assistant
      </Button>
      <Input
        className = 'bg-white mt-4'
        placeholder = 'Search'
      />

      <div className = 'flex flex-col gap-5 p-1 my-3'>
        {
          assistantList?.map((assist , index) => (
            <BlurFade key = {assist?.image} delay = {0.15 + index * 0.05} inView>
              <div 
                key={assist.id} 
                className={`p-2 flex items-center gap-2 hover:bg-gray-200 hover:dark:bg-slate-950 rounded-xl cursor-pointer
                  ${assistant?.id === assist.id && 'bg-gray-200' }
                `}
                onClick = {() => setAssistant(assist)}
              >
                <Image 
                  src={assist.image}
                  alt={assist.name}
                  width={60}
                  height={60}
                  className='rounded-xl w-[60px] h-[60px] object-cover'
                />
                <div className='p-1 flex flex-col justify-center'>
                  <h2 className='font-medium text-md dark:text-white dark:font-semibold text-gray-700'>
                    {assist.name}
                  </h2>
                  <h2 className='text-[13px] text-gray-500 dark:text-gray-300'>
                    {assist.title}
                  </h2>
                </div>
              </div>
            </BlurFade>
          ))
        }
      </div>
      <div className="absolute bottom-2 left-0 w-full px-3">
        {user && (
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <Image
              src={user.picture}
              alt="User"
              width={35}
              height={35}
              className="rounded-full shrink-0"
            />
            <div className="flex flex-col overflow-hidden w-full">
              <h2 className="text-sm font-medium text-gray-700 dark:text-white truncate">
                {user.name}
              </h2>
              <h2 className="text-xs text-gray-500 dark:text-gray-300">
                {user.orderId ? 'Pro Plan 🚀' : 'Free Plan 🐝'}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssistantsList
