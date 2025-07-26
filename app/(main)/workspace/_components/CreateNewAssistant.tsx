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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useContext, useState } from "react"
import { AssistantType } from "../../ai-assistants/page"
import { aiModelOptions } from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";
import AssistantAvatar from "./AssistantAvatar";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Id } from "@/convex/_generated/dataModel";
import { AssistantContext } from "@/context/AssistantContext";
import { Loader2Icon } from "lucide-react";


const Default_Assistant = {
  image : '/assistM2.jpg',
  name : '',
  title : '',
  instruction : '',
  id: 0,
  sampleQuestions : [],
  userInstruction : '',
  aiModelId : '',
}

function CreateNewAssistant({children} : any) {

  const [selectedAssistant , setSelectedAssistant] = useState<AssistantType>(Default_Assistant);
  const [loading , setLoading] = useState(false);

  const addAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);

  const {assistant , setAssistant} = useContext(AssistantContext);

  const {user} = useContext(AuthContext);

  const handleInputChange = (field : string , value : string) => {
    setSelectedAssistant((prev : any) => ({
      ...prev , 
      [field] : value
    }))
  };

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
      const inserted = result.find(r => r.status === "inserted");
      const skipped = result.find(r => r.status === "skipped");

      if(inserted) toast.success(`${inserted.title} added successfully!`);
      if(skipped) toast.warning(`${skipped.title} already exists`);
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
            <DialogTitle className = 'p-4'> Create your own Orbit Mind </DialogTitle>
            <DialogDescription asChild>
                <div className = 'p-4'>
                  <div className = 'flex items-center gap-3'>
                      {
                        selectedAssistant && 
                        <AssistantAvatar selectedImage = {(value : string) => handleInputChange('image' , value)}>
                          <Image 
                            src = {selectedAssistant?.image}
                            alt = {selectedAssistant?.title}
                            width = {150}
                            height = {150}
                            className = 'w-[100px] h-[100px] rounded-lg cursor-pointer object-cover'
                          />
                        </AssistantAvatar>
                      }
                      <div className = 'flex gap-3 flex-col w-full dark:text-white/80'>
                        <Input
                          placeholder = 'Name of Assistant'
                          onChange = {(e) => handleInputChange('name' , e.target.value)}
                          value = {selectedAssistant?.name}
                        />
                        <Input
                          placeholder = 'Title of Assistant'
                          onChange = {(e) => handleInputChange('title' , e.target.value)}
                          value = {selectedAssistant?.title}
                        />
                      </div>
                  </div>
                  <div className = 'mt-4'>
                      <h2 className = 'my-2 text-gray-600 dark:text-cyan-500'>
                        Model : 
                      </h2>
                    <Select 
                      defaultValue = {selectedAssistant.aiModelId}
                      onValueChange = {(value) => handleInputChange('aiModelId' , value)} 
                    >
                      <SelectTrigger className = "cursor-pointer w-full bg-white">
                        <SelectValue 
                          placeholder = 'Select Model'
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
                                className = 'flex items-center gap-2 cursor-pointer my-2'
                              >
                                <Image 
                                  src = {model.logo}
                                  alt = {model.name}
                                  height = {20}
                                  width = {20}
                                  className = 'rounded-full'
                                />
                                <h2 className = 'font-light text-md text-gray-700 dark:text-white/80'>
                                  {model.name}
                                </h2>
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className = 'mt-5'>
                    <h2 className = 'my-2 text-gray-600 dark:text-cyan-500'>
                      Instructions : 
                    </h2>
                    <Textarea 
                      className = 'h-[200px] bg-white'
                      placeholder = 'Add Instructions'
                      value = {selectedAssistant?.userInstruction}
                      onChange = {(e) => handleInputChange('userInstruction' , e.target.value)}
                    />
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

export default CreateNewAssistant
