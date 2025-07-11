import React from 'react'
import AssistantsList from './_components/AssistantsList'
import Settings from './_components/AssistantSettings'
import ChatUI from './_components/ChatUI'

function Workspace() {
  return (
    <div className = 'h-screen fixed w-full'>
      <div className = 'grid grid-cols-8'>
        <div className = 'hidden md:block col-span-2'>
         <AssistantsList/>
        </div>
        <div className = 'md:col-span-4'>
           <ChatUI/>
        </div>
        <div className = 'hidden lg:block md:col-span-2'>
            <Settings/>
        </div>
      </div>
    </div>
  )
}

export default Workspace