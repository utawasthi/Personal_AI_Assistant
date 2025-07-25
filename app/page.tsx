"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleOnClick = () => {
    router.push('/sign-in');
  }


  return (
     <div
        className="fixed top-0 left-0 w-full h-[100vh] -z-10 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('/banner.png')",
        }}
      >
        <div
          className = 'flex justify-center items-center pr-3 mr-10 mt-[80vh]'
        >
          <Button 
            className = 'bg-cyan-300 hover:bg-cyan-500 cursor-pointer'
            onClick = {handleOnClick}
          >
            Get Started
          </Button>
        </div>
      </div>
  );
}
