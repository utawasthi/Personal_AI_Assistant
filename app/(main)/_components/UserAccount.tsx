"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/context/AuthContext"
import { googleLogout } from "@react-oauth/google";
import { LogOut, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"
import Profile from "../workspace/_components/Profile";

function UserAccount({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [openProfile , setOpenProfile] = useState<boolean>(false);

  const {user , setUser} = useContext(AuthContext);
  const router = useRouter();


  const handleLogOut = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user_token");
    router.push('/');
  }

  const handleOnClick = () => {
    console.log("user clicked in the userAccount component");
  }

  return (
    <div
     className = 'flex justify-center items-center'
     onClick = {handleOnClick}
    >
      <div>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="dark:bg-gray-800 p-2 rounded-lg cursor-pointer">
                {children}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick = {() => setOpenProfile(true)}>
                <UserCircle2 />Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick = {handleLogOut}>
                <LogOut />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Profile openDialog = {openProfile} setOpenDialog = {setOpenProfile}/>
    </div>
  )
}

export default UserAccount
