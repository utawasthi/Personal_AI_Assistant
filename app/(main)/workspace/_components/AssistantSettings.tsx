"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AssistantContext } from '@/context/AssistantContext'
import { aiModelOptions } from '@/services/AiModelOptions';
import Image from 'next/image';
import React, { useContext } from 'react'

function AssistantSettings() {

  const {assistant , setAssistant} = useContext(AssistantContext);


  return assistant && (
    <div className = 'p-5 bg-secondary border-l-[1px] h-screen'>
      <h2 className = 'font-medium text-xl'>
        Settings
      </h2>
      <div className = 'mt-4 flex flex-col gap-4'>
        <Image 
          src = {assistant?.image} 
          alt = 'Assistant'
          width = {80}
          height = {80}
          className = 'rounded-xl h-[80px] w-[80px]'
        />
        <div>
          <h2>
            {assistant?.name}
          </h2>
          <p>
            {assistant?.title}
          </p>
        </div>
        <div className = 'mt-4'>
          <h2 className = 'my-2 text-gray-600'>
            Model : 
          </h2>
          <Select>
            <SelectTrigger className = "w-full bg-white">
              <SelectValue placeholder = 'Select Model' />
            </SelectTrigger>
            <SelectContent>
              {
                aiModelOptions.map((model) => (
                  <div
                    key = {model.name}
                    className = 'flex items-center gap-2 cursor-pointer hover:bg-slate-100 my-2'
                  >
                    <Image 
                      src = {model.logo}
                      alt = {model.name}
                      height = {20}
                      width = {20}
                      className = 'rounded-full'
                    />
                   <h2 className = 'font-light text-md text-gray-700'>
                    {model.name}
                   </h2>
                  </div>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className = 'mt-4'>
          <h2 className = 'my-2 text-gray-600'>
            Instructions : 
          </h2>
          <Textarea 
            placeholder = 'Add Instructions'
            value = {assistant?.userInstruction}
          />
        </div>
      </div>
    </div>
  )
}

export default AssistantSettings
