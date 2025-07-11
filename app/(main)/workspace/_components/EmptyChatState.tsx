import React, { useContext } from 'react'
import { AssistantContext } from '@/context/AssistantContext'
import { ChevronRight } from 'lucide-react';
import { BlurFade } from '@/components/magicui/blur-fade';

function EmptyChatState() {

    const {assistant , setAssistant} = useContext(AssistantContext);

  return (
    <div className = 'mt-12 flex flex-col items-center'>
      <h2 className = 'font-bold text-3xl'>
        Where should we begin?
      </h2>

      <div className = 'flex flex-col gap-5 p-4 m-3 mt-7'>
        {
          assistant?.sampleQuestions.map((suggestion : string, index : number) => (
            <BlurFade key = {index} delay = {0.25 * index} inView>
              <div
              key = {index}
              className = 'p-3 border rounded-3xl shadow-xs hover:bg-slate-100 cursor-pointer'
              >
                <h2
                  className = 'font-medium text-gray-700 flex justify-between items-center gap-7'
                > 
                {suggestion} 
                <ChevronRight/>
                </h2>
              </div>
            </BlurFade>
          ))
        }
      </div>
    </div>
  )
}

export default EmptyChatState