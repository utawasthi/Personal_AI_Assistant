"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress";
import { AuthContext } from "@/context/AuthContext";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface ProfileProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function Profile( {openDialog  , setOpenDialog} : ProfileProps) {

  const {user} = useContext(AuthContext);
  const [maxToken , setMaxToken] = useState<number>(0);
  const [loading , setLoading] = useState<boolean>(false);

  useEffect(() => {
    if(user?.orderId) {
      setMaxToken(10000);
    }
    else setMaxToken(5000);
  } , []);

  const generateSubscriptionId = async () => {
    try{
      setLoading(true);
      const result = await axios.post('/api/create-subscription');
      console.log(result.data);
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  const MakePayment = async () => {
    
  }

  if(openDialog) console.log("user clicked");
  return (
    <Dialog open = {openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className = 'flex gap-4 items-center m-2'>
                <Image 
                  src = {user?.picture!}
                  alt = 'user'
                  width = {150}
                  height = {150}
                  className = 'w-[60px] h-[60px] rounded-full'
                />
                <div>
                  <h2 className = 'text-gray-700/90 font-semibold text-lg'>{user?.name}</h2>
                  <h2 className = 'text-gray-500'>{user?.email}</h2>
                </div>
               </div>
              <div className = 'flex flex-col gap-2 m-2'>
                  <hr className = 'my-3'/>
                  <h2 className = 'text-gray-600 text-md font-semibold'>Tokens Left</h2>
                  <h2 className = 'font-light'>
                    {Number(user?.credits)} / {maxToken}
                  </h2>
                  <Progress value={(Number(user?.credits) / maxToken) * 100} />
                  <h2 className = 'flex justify-start items-center gap-4 text-md p-1 mt-1 font-semibold'>
                    Current Plan
                    <span className = 'ml-2 p-1 bg-gray-300/60 rounded-md'>{!user?.orderId ? "🐝 Free Plan" : "💎 Premium"}</span>
                  </h2>
              </div>
              <div className = 'p-4 mt-3 border rounded-xl'>
                <div className = 'flex justify-between'>
                  <div>
                    <h2 className = 'text-gray-700 font-bold text-lg'> Premium Plan </h2>
                    <h2 className = 'text-gray-500 font-semibold text-base'> 500,000 Tokens</h2>
                  </div>
                  <div className = 'text-slate-800 font-bold text-lg'>
                    $10 / month
                  </div>
                </div>
                <hr className = 'my-3' />
                <Button className = 'w-full cursor-pointer'
                  disabled = {loading}
                  onClick = {generateSubscriptionId}
                >
                  {loading ? <Loader2Icon className = 'animate-spin' /> : null}
                  Get Started
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Profile
