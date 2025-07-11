"use client"

import { Button } from '@/components/ui/button'
import EmptyChatState from './EmptyChatState'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

function ChatUI() {

  const [input , setInput] = useState<string>();

  const handleOnSendMessage = () => {
    
  }

  return (
    <div className = 'mt-20 p-6'>
      <EmptyChatState/>
      <div className = 'flex justify-between p-5 gap-5 bg-slate-100 rounded-3xl h-[100px] items-center mt-20'>
        <Textarea
          className = "border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none !text-lg resize-none"
          placeholder = 'Ask anything'
          onChange = {(e) => setInput(e.target.value)}
          onKeyPress = {(e) => {e.key == 'Enter' && handleOnSendMessage}}
        /> 
        <Button className = 'rounded-full cursor-pointer'>
          <Send/>
        </Button>

      </div>
    </div>
  )
}

export default ChatUI