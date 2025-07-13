import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import AiAssistantsList from "@/services/AiAssistantsList"
import Image from "next/image"

function AssistantAvatar({children , selectedImage} : any) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div
          className = 'grid grid-cols-5 gap-2'
        >
          {
            AiAssistantsList.map((assistant , index) => (
              <div 
                key = {index}
              >
                <Image 
                  src = {assistant.image}
                  alt = {assistant.name}
                  width = {80}
                  height = {80}
                  className = 'cursor-pointer w-[30px] h-[30px] rounded-lg object-cover'
                  onClick = {() => selectedImage(assistant.image)}
                />
              </div>
            ))
          }
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AssistantAvatar
