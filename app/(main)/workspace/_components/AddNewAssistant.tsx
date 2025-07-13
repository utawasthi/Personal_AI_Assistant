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
import AiAssistantsList from "@/services/AiAssistantsList"
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
  image : '/bug-fixer.avif',
  name : '',
  title : '',
  instruction : '',
  id : 0,
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

    try{
      setLoading(true);
      const result = await addAssistant({
        records : [selectedAssistant] ,
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
            <DialogTitle> Make Your Own Assistent </DialogTitle>
            <DialogDescription asChild>
              <div className = 'grid grid-cols-3 gap-5 mt-5'>
                <div className = 'border-r-[1px] p-1'>
                  <Button 
                    variant = {'secondary'}
                    size = {'sm'}
                    className = 'w-full cursor-pointer'
                    onClick = {() => setSelectedAssistant(Default_Assistant)}
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
                      <div className = 'flex gap-3 flex-col w-full'>
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
                      <h2 className = 'my-2 text-gray-600'>
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
                                className = 'flex items-center gap-2 cursor-pointer hover:bg-slate-100 my-2'
                              >
                                <Image 
                                  src = {model.logo}
                                  alt = {model.name}
                                  height = {20}
                                  width = {20}
                                  className = 'rounded-full'
                                />
                                <h2 className = 'font-light text-md text-gray-700'>
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
                    <h2 className = 'my-2 text-gray-600'>
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
                      className = 'cursor-pointer'
                    >
                      {loading && <Loader2Icon className = 'animate-spin'/>}
                      Add 
                    </Button>
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
