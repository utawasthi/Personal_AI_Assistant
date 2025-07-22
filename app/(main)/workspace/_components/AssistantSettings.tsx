"use client"

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AssistantContext } from '@/context/AssistantContext'
import { api } from '@/convex/_generated/api';
import { aiModelOptions } from '@/services/AiModelOptions';
import { useMutation } from 'convex/react';
import { Loader, Loader2Icon, Save, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import ConfirmationDialog from './ConfirmationDialog';
import { DeleteAssistant } from '@/convex/userAiAssistants';
import { BlurFade } from '@/components/magicui/blur-fade';

function AssistantSettings() {

  const {assistant , setAssistant} = useContext(AssistantContext);

  const updateAssistant = useMutation(api.userAiAssistants.UpdateUserAiAssistant);
  const deleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);

  const [loading , setLoading] = useState<boolean>(false);

  const handleOnInputChange = (field : string , value : string) => {
     setAssistant((prev : any) => ({
      ...prev , 
      [field] : value,
     }))
  }

  const handleOnSave = async () => {

    try{
      setLoading(true);
      const result = await updateAssistant({
        id : assistant?._id,
        aiModelId : assistant?.aiModelId,
        userInstruction : assistant?.userInstruction,
      });
      // console.log('result from ai assistant settings' , result);
      toast('Changes Saved. Yey!! 🥳')
    }
    catch(err){
      console.log(err);
    }
    finally{
       setLoading(false);
    }
  }

  const handleOnDelete = async () => {
    console.log("Delete Action Performed !!!");
    setLoading(true);
    await deleteAssistant({
      id : assistant?._id
    });
    setAssistant(null);
    setLoading(false);
  }

  return assistant && (
    <div className = 'p-5 bg-secondary dark:bg-black/20 border-l-[1px] h-screen'>
      <h2 className = 'font-medium text-xl'>
        Settings
      </h2>
      <BlurFade delay = {0.25}>
        <div className = 'mt-4 flex flex-col gap-4'>
          <Image 
            src = {assistant?.image} 
            alt = 'Assistant'
            width = {80}
            height = {80}
            className = 'rounded-xl h-[80px] w-[80px] object-cover'
          />
          <div>
            <h2> {assistant?.name} </h2>
            <p className = 'font-medium text-gray-400'> {assistant?.title} </p>
          </div>
          <div className = 'mt-4'>
            <h2 className = 'my-2 text-gray-600 dark:text-white/80'>
              Model : 
            </h2>
            <Select 
              defaultValue = {assistant.aiModelId}
              onValueChange = {(value) => handleOnInputChange('aiModelId' , value)} 
            >
              <SelectTrigger className = "cursor-pointer w-full bg-white dark:bg-black/25">
                <SelectValue 
                  placeholder = 'Select Model'
                  className = 'dark:text-white'
                />
              </SelectTrigger>
              <SelectContent>
                {
                  aiModelOptions.map((model) => (
                    <SelectItem 
                      value = {model.model}
                      key = {model.name}
                    >
                      <div
                        key = {model.name}
                        className = 'flex items-center gap-2 cursor-pointer my-2 dark:text-white'
                      >
                        <Image 
                          src = {model.logo}
                          alt = {model.name}
                          height = {20}
                          width = {20}
                          className = 'rounded-full'
                        />
                        <h2 className = 'font-light text-md text-gray-700 dark:text-white'>
                          {model.name}
                        </h2>
                      </div>
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className = 'mt-4'>
            <h2 className = 'my-2 text-gray-600 dark:text-white/90'>
              Instructions : 
            </h2>
            <Textarea 
              className = 'h-[180px] bg-white dark:bg-black/25'
              placeholder = 'Add Instructions'
              value = {assistant?.userInstruction}
              onChange = {(e) => handleOnInputChange('userInstruction' , e.target.value)}
            />
          </div>
          <div
            className = 'absolute bottom-2 right-5 flex gap-5'
          >
            <ConfirmationDialog 
              handleOnDelete = {handleOnDelete}
            >
              <Button 
                variant = 'ghost'
                disabled = {loading}
                className = 'cursor-pointer'
              >
                <Trash/> Delete
              </Button>
            </ConfirmationDialog>
            <Button 
              onClick = {handleOnSave}
              disabled = {loading}
              className = 'cursor-pointer dark:bg-cyan-950 dark:text-white/95'
            >
              {loading ? <Loader2Icon className = 'animate-spin'/> :  <Save/>}
              Save
            </Button>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}

export default AssistantSettings
