"use client"

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { AssistantType } from '../../ai-assistants/page';
import Image from 'next/image';
import { AssistantContext } from '@/context/AssistantContext';

import { BlurFade } from '@/components/magicui/blur-fade';
import AddNewAssistant from './AddNewAssistant';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCircle2 } from 'lucide-react';
import Profile from './Profile';
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import SearchAssistant from './SearchAssistant';
import CreateNewAssistant from './CreateNewAssistant';

function AssistantsList() {

  const [assistantList , setAssistantList] = useState<AssistantType[]>([]);
  const [openProfile , setOpenProfile] = useState<boolean>(false);

  const {user , setUser} = useContext(AuthContext);
  const {assistant , setAssistant} = useContext(AssistantContext);
  const convex = useConvex();

  const router = useRouter();


   useEffect(() => {
      user &&  GetUserAssistants();
    } , [user , assistant == null]);
  
    const GetUserAssistants = async () => {
      const result = await convex.query(api.userAiAssistants.GetAllUserAssistants , {
        uid : user?._id as Id<"users">,
      });
      setAssistantList(result);
    }

    const handleLogOut = () => {
      googleLogout();
      setUser(null);
      localStorage.removeItem("user_token");
      router.push('/');
    }

  return (
      <div className="flex flex-col h-screen bg-black border-r-[0.5px] p-4">
        <Image
          src = {'/orbit.png'}
          alt = {'logo'}
          height = {40}
          width = {40}
          className = 'object-cover h-[50px] w-[50px]'
        />

        <CreateNewAssistant>
          <Button className="w-full mt-3 text-sm font-medium cursor-pointer dark:bg-cyan-950 dark:text-white/95">
            + Create Your Own
          </Button>
        </CreateNewAssistant>

        <AddNewAssistant>
          <Button className="w-full mt-3 text-sm font-medium cursor-pointer dark:bg-cyan-950 dark:text-white/95">
            + Add New Assistant
          </Button>
        </AddNewAssistant>

        <div
         className = 'mt-4'
        >
          <SearchAssistant list = {assistantList}/>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide mt-4 space-y-4 pr-1">
          {assistantList
          ?.slice()
          .sort((a , b) => (a.name === assistant?.name ? -1 : b.name === assistant?.name ? 1 : 0))
          .map((assist, index) => (
            <BlurFade key={index} delay={index * 0.05} inView>
              <div
                key={assist.name}
                className={`p-2 flex items-center gap-2 hover:bg-gray-200 hover:dark:bg-slate-900 rounded-xl cursor-pointer
                  ${assistant?.name === assist.name && 'bg-gray-200 dark:bg-zinc-800'}
                `}
                onClick={() => setAssistant(assist)}
              >
                <Image
                  src={assist.image}
                  alt={assist.name}
                  width={60}
                  height={60}
                  className="rounded-xl w-[60px] h-[60px] object-cover"
                />
                <div className="p-1 flex flex-col justify-center">
                  <h2 className="font-medium text-md text-gray-700 dark:text-cyan-400">
                    {assist.name}
                  </h2>
                  <h2 className="text-[13px] text-gray-500 dark:text-gray-300">
                    {assist.title}
                  </h2>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-3 items-center bg-white dark:bg-slate-950 p-2 rounded-lg shadow-sm cursor-pointer">
                  <Image
                    src={user.picture}
                    alt="User"
                    width={35}
                    height={35}
                    className="rounded-full shrink-0"
                  />
                  <div className="flex flex-col overflow-hidden w-full">
                    <h2 className="text-sm font-medium text-gray-700 truncate dark:text-white/80">
                      {user.name}
                    </h2>
                    <h2 className="text-xs text-gray-500 dark:text-gray-300">
                      {user.orderId ? 'Pro Plan 🚀' : 'Free Plan 🐝'}
                    </h2>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                  <UserCircle2 />Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>
                  <LogOut />Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <Profile openDialog={openProfile} setOpenDialog={setOpenProfile} />
      </div>
    );
}

export default AssistantsList
