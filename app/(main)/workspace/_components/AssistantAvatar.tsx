import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { assistantImages } from "@/services/AiAssistantAvatar"
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
            assistantImages.map((img, index) => (
              <div 
                key = {index}
              >
                <Image 
                  src = {img}
                  alt = {'assistant'}
                  width = {80}
                  height = {80}
                  className = 'cursor-pointer w-[30px] h-[30px] rounded-lg object-cover'
                  onClick = {() => selectedImage(img)}
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