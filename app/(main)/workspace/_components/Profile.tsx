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
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProfileProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

declare global {
  interface Window {
    Razorpay : any;
  }
}

function Profile( {openDialog  , setOpenDialog} : ProfileProps) {

  const {user} = useContext(AuthContext);
  const [maxToken , setMaxToken] = useState<number>(0);
  const [loading , setLoading] = useState<boolean>(false);

  const updateUserOrder = useMutation(api.users.UpdateTokens);

  const router = useRouter();

  useEffect(() => {
    if(user?.orderId) {
      setMaxToken(505000);
    }
    else setMaxToken(5000);
  } , [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  } , []);

  const generateSubscriptionId = async () => {
    try{
      setLoading(true);
      const result = await axios.post('/api/create-subscription');
      console.log(result.data);
      makePayment(result?.data?.id);
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  const makePayment = async (subscriptionId : string) => {
    let options = {
      key : process.env.RAZORPAY_KEY_ID,
      subscription_id : subscriptionId,
      name : 'AI Assistant by utawasthi',
      description : 'This is my first project man',
      image : '/orbit.png',
      handler : async function (res : any){
        console.log(res);
        // console.log(res.razorpay_payment_id);
        // console.log(res.razorpay.subscription_id);

        if(res?.razorpay_subscription_id){
          await updateUserOrder({
          uid : user?._id as Id<"users">,
          orderId : res.razorpay_subscription_id!,
          credits : Number(user?.credits) + 500000,
          });
          toast('Thank you for subscribing! Unleash the power of AI');
          router.refresh();
        }
      },
      'prefill' : {
        name : user?.name,
        email : user?.email,
      },
      notes : {

      },
      theme : {
        color : '#000000'
      }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const cancelSubscription = async (subscriptionId : string) => {
     console.log("cancel subscription requested");
     try{
      setLoading(true);
      const result = await axios.post('/api/cancel-subscription' , {
          subscriptionId : user?.orderId,
          cancelAtCycleEnd : false,
      });
      console.log(result);
      if(result?.data?.status){
        await updateUserOrder({
          uid : user?._id as Id<"users">,
          credits : Math.max(0 , Number(user?.credits) - 500000),
          orderId : "",
        });
        toast('Your Plan is Cancelled ! Back to Free Tier');
        router.refresh();
      } 
     }
     catch(error){
      console.log(error);
     }
     finally{
      setLoading(false);
     }
  }

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
                  <h2 className = 'text-gray-700/90 font-semibold text-lg dark:text-white/95'>
                    {user?.name}
                  </h2>
                  <h2 className = 'text-gray-500'>{user?.email}</h2>
                </div>
               </div>
              <div className = 'flex flex-col gap-2 m-2'>
                  <hr className = 'my-3'/>
                  <h2 className = 'text-gray-600 text-md font-semibold dark:text-white/95'>
                    Tokens Left
                  </h2>
                  <h2 className = 'font-light'>
                    {Number(user?.credits)} / {maxToken}
                  </h2>
                  <Progress
                   value={(Number(user?.credits) / maxToken) * 100} 
                   className="dark:[&>div]:bg-cyan-500"
                  />
                  <h2 className = 'flex justify-start items-center gap-10 text-md p-1 mt-1 font-semibold dark:text-white/95'>
                    Current Plan
                    <span 
                      className = 'ml-2 p-1 bg-gray-300/60 rounded-md dark:text-white/95 dark:bg-cyan-950'
                    >
                      {
                        !user?.orderId ? "🐝 Free Plan" : "💎 Premium"
                      }
                    </span>
                  </h2>
              </div>

              {
                !user?.orderId ?  
                <div className = 'p-4 mt-3 border rounded-xl'>
                  <div className = 'flex justify-between'>
                    <div>
                      <h2 className = 'text-gray-700 font-bold text-lg dark:text-white/90'> Premium Plan </h2>
                      <h2 className = 'text-gray-500 font-semibold text-base dark:text-gray-400'> 500,000 Tokens</h2>
                    </div>
                    <div className = 'text-slate-800 font-bold text-lg dark:text-gray-400'>
                      $10 / month
                    </div>
                  </div>
                  <hr className = 'my-3' />
                  <Button className = 'w-full cursor-pointer dark:bg-cyan-950 dark:text-white/95 dark:hover:bg-cyan-900'
                    disabled = {loading}
                    onClick = {generateSubscriptionId}
                  >
                    {loading ? <Loader2Icon className = 'animate-spin' /> : null}
                    Get Started
                  </Button>
                </div>
                : 
                <div className = 'flex justify-start items-center mt-5'>
                  <Button 
                   className = 'w-full cursor-pointer dark:bg-cyan-950 dark:text-white/95 dark:hover:bg-cyan-900'
                   variant = 'secondary'
                   onClick = {() => cancelSubscription(user?.orderId!)}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              }
             
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Profile
