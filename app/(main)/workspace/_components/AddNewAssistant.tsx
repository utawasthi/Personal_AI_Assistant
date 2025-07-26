import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AiAssistantsList from "@/services/AiAssistantsList"
import Image from "next/image"
import { useContext, useState } from "react"
import { AssistantType } from "../../ai-assistants/page"
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Id } from "@/convex/_generated/dataModel";
import { AssistantContext } from "@/context/AssistantContext";
import { Loader2Icon } from "lucide-react";


const Default_Assistant = {
  image : '/bug-fixer.avif',
  name : '',
  title : '',
  instruction : '',
  id: 0,
  sampleQuestions : [],
  userInstruction : '',
  aiModelId : '',
}

function AddNewAssistant({children} : any) {

  const [selectedAssistant , setSelectedAssistant] = useState<AssistantType>(Default_Assistant);
  const [loading , setLoading] = useState(false);

  const addAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);

  const {assistant , setAssistant} = useContext(AssistantContext);

  const {user} = useContext(AuthContext);

  const handleOnSave = async () => {
    if(!selectedAssistant?.name || !selectedAssistant?.title || !selectedAssistant?.image){
      toast("Please enter all the details");
      return;
    }

    const newAssistant = {
      ...selectedAssistant,
      id : Math.floor(Math.random() * 1_000_000_000),
    }

    try{
      setLoading(true);
      const result = await addAssistant({
        records : [newAssistant] ,
        uid : user?._id as Id<"users">,
      });
      toast("New Assistant Added !!");
      setAssistant(null);
    }
    catch(err : any){
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Explore Orbit Mind Assistants </DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-2'>
                  {
                    AiAssistantsList.map((assistant , index) => (
                      <div className = 'col-span-1 p-3 border-[0.1px] m-3 hover:bg-secondary flex gap-2 items-center rounded-xl cursor-pointer'
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
                <div className = 'flex gap-5 justify-end mt-10'>
                  <DialogClose asChild>
                    <Button
                      variant = {'secondary'}
                      className = 'cursor-pointer'
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button 
                    disabled = {loading}
                    onClick = {handleOnSave}
                    className = 'cursor-pointer dark:bg-cyan-950 dark:text-white/95'
                  >
                    {loading && <Loader2Icon className = 'animate-spin'/>}
                    Add 
                  </Button>
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