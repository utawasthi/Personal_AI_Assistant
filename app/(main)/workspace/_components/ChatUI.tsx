"use client"

import { Button } from '@/components/ui/button'
import EmptyChatState from './EmptyChatState'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContext, useState } from 'react'
import { aiModelOptions } from '@/services/AiModelOptions'
import { AssistantContext } from '@/context/AssistantContext'
import axios from 'axios'

interface MessageType{
  role : string;
  content : string;
}

function ChatUI() {

  const [input , setInput] = useState<string>('');
  const [messages , setMessages] = useState<MessageType[]> ([]);
  const {assistant , setAssistant} = useContext(AssistantContext);

  const handleOnSendMessage = async () => {

    setMessages(prev => [...prev , ({
      role : 'user',
      content : input,
    })]);

    const userInput = input;
    setInput('');

    const AiModel = aiModelOptions.find(item => item.model === assistant.aiModelId);

    try {
      const res = await axios.post("/api/ai-model", {
        provider: AiModel?.model,
        userInput: userInput,
      });

      console.log("AI response:", res.data.reply);
      setMessages(prev => [...prev , res.data.reply]);
    } catch (err: any) {
      console.error("Request failed:", err?.response?.data || err.message);
    }
  }

  console.log("messages list--> " , messages);
  console.log("msg length" , messages.length);

  return (
    <div className = 'mt-20 p-6'>
      {
        messages?.length === 0 && 
        (<EmptyChatState/>)
      }

      <div>
        {
          messages.map((msg , index) => (
            <div 
              key = {index}
            >
              <div>
                <div>
                  {msg.content}
                </div>
              </div>
            </div>
          ))
        }
      </div>


      <div className = 'flex justify-between p-5 gap-5 bg-slate-100 rounded-3xl h-[100px] items-center mt-20'>
        <Textarea
          className = "border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none !text-lg resize-none"
          placeholder = 'Ask anything'
          value = {input}
          onChange = {(e) => setInput(e.target.value)}
          onKeyPress = {(e) => {e.key == 'return' && handleOnSendMessage}}
        /> 
        <Button 
          className = 'rounded-full cursor-pointer'
          onClick = {handleOnSendMessage}
        >
          <Send/>
        </Button>

      </div>
    </div>
  )
}

export default ChatUI