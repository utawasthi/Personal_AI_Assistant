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

function AssistantsList() {

  const [assistantList , setAssistantList] = useState<AssistantType[]>();

  const {user} = useContext(AuthContext);
  const convex = useConvex();

   useEffect(() => {
      user &&  GetUserAssistants();
    } , [user]);
  
    const GetUserAssistants = async () => {
      const result = await convex.query(api.userAiAssistants.GetAllUserAssistants , {
        uid : user?._id as Id<"users">,
      });
      console.log("from assistant list component" , result);
      setAssistantList(result);
    }

  return (
    <div 
      className = 'p-5 bg-secondary border-r-[0.5px] h-screen'
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
          assistantList?.map((assistant) => (
            <div key={assistant.id} className='p-2 flex items-center gap-4 hover:bg-gray-200 hover:dark:bg-slate-950 rounded-xl cursor-pointer'>
              <Image 
                src={assistant.image}
                alt={assistant.name}
                width={60}
                height={60}
                className='rounded-xl w-[60px] h-[60px] object-cover'
              />
              <div className='p-1 flex flex-col justify-center'>
                <h2 className='font-medium text-md dark:text-white dark:font-semibold text-gray-700'>
                  {assistant.name}
                </h2>
                <h2 className='text-[13px] text-gray-500 dark:text-gray-300'>
                  {assistant.title}
                </h2>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AssistantsList
