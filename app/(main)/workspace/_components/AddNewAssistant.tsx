import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import AiAssistantsList from "@/services/AiAssistantsList"
import Image from "next/image"
import { useState } from "react"
import { AssistantType } from "../../ai-assistants/page"

function AddNewAssistant({children} : any) {

  const [selectedAssistant , setSelectedAssistant] = useState<AssistantType>({
    image : '/bug-fixer.avif',
    name : '',
    title : '',
    instruction : '',
    id : 0,
    sampleQuestions : [],
    userInstruction : '',
  });

  const handleInputChange = (field : string , value : string) => {
    setSelectedAssistant((prev : any) => ({
      ...prev , 
      [field] : value
    }))
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Make Your Own Assistent </DialogTitle>
            <DialogDescription asChild>
              <div className = 'grid grid-cols-3 gap-5 mt-5'>
                <div className = 'border-r-[1px] p-1'>
                  <Button 
                    variant = {'secondary'}
                    size = {'sm'}
                    className = 'w-full cursor-pointer'
                  >
                    + Create New Assistant
                  </Button>

                  <div className = 'mt-2'>
                    {
                      AiAssistantsList.map((assistant , index) => (
                        <div className = 'p-2 hover:bg-secondary flex gap-2 items-center rounded-xl cursor-pointer'
                        key = {index}
                        onClick = {() => setSelectedAssistant(assistant)}
                        >
                          <Image 
                            src = {assistant?.image}
                            alt = {assistant.name}
                            width = {60}
                            height = {60}
                            className = 'w-[40px] h-[40px] object-cover rounded-lg'
                          />
                          <h2 className = 'text-xs'>{assistant.title}</h2>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className = 'col-span-2'>
                   <div className = 'flex items-center gap-3'>
                      {
                        selectedAssistant && 
                        <Image 
                          src = {selectedAssistant?.image}
                          alt = {selectedAssistant?.title}
                          width = {150}
                          height = {150}
                          className = 'w-[100px] h-[100px] rounded-lg cursor-pointer object-cover'
                        />
                      }
                      <div className = 'flex gap-3 flex-col w-full'>
                        <Input
                          placeholder = 'Name of Assistant'
                          onChange = {(e) => handleInputChange('name' , e.target.value)}
                          value = {selectedAssistant?.name}
                        />
                        <Input
                          placeholder = 'Title of Assistant'
                          onChange = {(e) => handleInputChange('name' , e.target.value)}
                          value = {selectedAssistant?.title}
                        />
                      </div>
                   </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewAssistant
