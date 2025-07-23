"use client"

import { createContext, ReactNode, useState } from "react";

type ChatInputContextType = {
  input : string;
  setInput : (value : string) => void;
}

export const ChatInputContext = createContext<ChatInputContextType>({
  input : "",
  setInput : () => {},
});

export const ChatInputProvider = ({children} : {children : ReactNode}) => {
  const [input , setInput] = useState("");

  return (
    <ChatInputContext.Provider value = {{input , setInput}}>
      {children}
    </ChatInputContext.Provider>
  )
}