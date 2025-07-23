import { createContext, ReactNode, useState } from "react";


type MessageType = {
  role : "user" | "assistant" | "system";
  content : string;
}


type MessageContextType = {
  messages : MessageType[],
  setMessages : React.Dispatch<React.SetStateAction<MessageType[]>>;
}

export const MessageContext = createContext<MessageContextType>({
  messages : [],
  setMessages : () => {},
});


export const MessageProvider = ({children} : {children : ReactNode}) => {
  const [messages , setMessages] = useState<MessageType[]>([]);

  return (
    <MessageContext.Provider value = {{messages , setMessages}}>
      {children}
    </MessageContext.Provider>
  )
}