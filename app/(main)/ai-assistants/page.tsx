import { Button } from '@/components/ui/button'
import React from 'react'

function AiAssistants() {
  return (
    <div className = 'px-10 mt-20 md:px-28 lg:px-36 xl:px-48' >
      <div className = 'flex justify-between items-center'>
        <div>
          <h2 className = 'text-2xl font-semibold tracking-wide'>Welcome To The World of AI Assistants</h2>
          <p className = 'text-md text-gray-600 font-light'>Choose your AI Companion to Simplify Your Tasks</p>
        </div>
        <Button> Continue </Button>
      </div>
    </div>
  )
}

export default AiAssistants
