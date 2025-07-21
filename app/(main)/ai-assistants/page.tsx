"use client"

import { BlurFade } from '@/components/magicui/blur-fade'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthContext } from '@/context/AuthContext'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import AiAssistantsList from '@/services/AiAssistantsList'
import { useConvex, useMutation } from 'convex/react'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export type AssistantType = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
  aiModelId? : string;
  credits? : number;
}

function AiAssistants() {

  const [selectedAssistant , setSelectedAssistant] = useState<AssistantType[]>([]);
  const [loading , setLoading] = useState<boolean>(false);

  const convex = useConvex();
  const {user} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    user &&  GetUserAssistants();
  } , [user]);

  const GetUserAssistants = async () => {
    const result = await convex.query(api.userAiAssistants.GetAllUserAssistants , {
      uid : user?._id as Id<"users">,
    });
    
    console.log(result);
    if(result.length){
      //  navigte to new screen 
      router.replace('/workspace');
      return ;
    }
  }

  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);

  const handleOnSelect = (assistant : AssistantType) => {
      const item  = selectedAssistant.find((item : AssistantType) => item.id === assistant.id); 
      if(item){
        setSelectedAssistant(selectedAssistant.filter((item : AssistantType) => item.id != assistant.id));
        return;
      }
      setSelectedAssistant(prev => [...prev , assistant]);
  }

  const isAssistantSelected = (assistant : AssistantType) => {
    const item  = selectedAssistant.find((item : AssistantType) => item.id === assistant.id); 

    return (item ? true : false);
  }

  const handleOnClickContinue = async () => {

    const safeRecords = selectedAssistant.map((assistant) => ({
      id: assistant.id,
      name: assistant.name,
      title: assistant.title,
      image: assistant.image,
      instruction: assistant.instruction,
      userInstruction: assistant.userInstruction,
      sampleQuestions: assistant.sampleQuestions,
    }));

    if (!user?._id) {
      console.error("User is missing or not loaded.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await insertAssistant({
        records: safeRecords,
        uid: user._id as Id<"users">,
      });

      console.log("from insert Assistant", result);
    } catch (err) {
      console.error("Failed to insert assistants", err);
    } finally {
      setLoading(false);
    }
 };


  return (
    <div className = 'px-10 mt-20 md:px-28 lg:px-36 xl:px-48' >
      <div className = 'flex justify-between items-center'>
        <div>
          <BlurFade delay = {0.15} inView>
            <h2 className = 'text-2xl font-semibold tracking-wide'>
              Welcome To The World of AI Assistants 
             <span className = 'ml-3 text-[40px]'>🧸</span> 
           </h2>
          </BlurFade>
         <BlurFade delay = {0.15 * 2}>
           <p className = 'text-md text-gray-60 font-light'>Choose your AI Companion to Simplify Your Tasks
           <span className = 'ml-3 text-[20px]'> 🚀 </span>
          </p>
         </BlurFade>
        </div>
        <RainbowButton
          className = 'rounded-xl'
          disabled = {selectedAssistant.length === 0 || loading}
          onClick = {handleOnClickContinue}
        >
          {loading && <Loader className = 'animate-spin'/>} Continue
        </RainbowButton>
      </div>
      <div className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {
          AiAssistantsList.map((assistant , index) => (
            <BlurFade 
              key = {assistant.image} 
              delay = {0.1 + index * 0.15}
              inView
            >
              <div 
                key = {assistant.id} 
                className = 'hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative'
                onClick = {() => handleOnSelect(assistant)}
              >
                <Checkbox 
                className = 'absolute m-2'
                checked = {isAssistantSelected(assistant)}
                />
                <Image 
                  src = {assistant.image}
                  alt = {assistant.title}
                  width = {600}
                  height = {600}
                  className = 'h-[200px] w-[200px] object-cover'
                />
                <h2 className = 'dark:text-gray-300 text-lg font-semibold text-gray-600'>
                  {assistant.name}
                </h2>
                <h2 className = 'dark:text-gray-300 text-md font-light dark:font-thin text-gray-500'>{assistant.title}</h2>
              </div>
            </BlurFade>
          ))
        }
      </div>
    </div>
  )
}

export default AiAssistants
