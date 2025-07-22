"use client";

import 'highlight.js/styles/github-dark.css';
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import EmptyChatState from "./EmptyChatState";
import { Loader2Icon, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useRef, useState } from "react";
import { aiModelOptions } from "@/services/AiModelOptions";
import { AssistantContext } from "@/context/AssistantContext";
import axios from "axios";
import Image from "next/image";
import { loadingMessages } from "@/services/LoadingMessages";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext, UserType } from "@/context/AuthContext";
import { Id } from "@/convex/_generated/dataModel";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MessageType {
  role: "user" | "assistant" | "system";
  content: string;
}

function ChatUI() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chatRef = useRef<any>(null);

  const {user , setUser} = useContext(AuthContext);

  const { assistant } = useContext(AssistantContext);

  useEffect(() => {
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  } , [messages]);

  useEffect(() => {
    setMessages([]);
  } , [assistant?.id]);


  const updateToken = useMutation(api.users.UpdateTokens);

  const getRandomLoadingMessage = (): string => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  };

  const handleOnSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: getRandomLoadingMessage() },
    ]);

    const userInput = input;
    setInput("");
    setLoading(true);

    const AiModel = aiModelOptions.find(
      (item) => item.model === assistant.aiModelId
    );

    try {
      const res = await axios.post("/api/ai-model", {
        provider: AiModel?.model,
        userInput: userInput,
        aiResponse : messages[messages.length - 1].content,
      });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: res.data.reply.content },
      ]);
      updateUserToken(res.data.reply.content);
    } 
    catch (err: any) {
      const msg = err?.response?.data?.error;
      const errorMsg =
        msg?.includes("free limit is exhausted")
          ? msg
          : "Something went wrong.";
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: errorMsg },
      ]);
      console.error("Request failed:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserToken = async (response : string) => {
    const tokenCount = response.trim() ? response.trim().split(/\s+/).length : 0;

    console.log(tokenCount);
    // update user token --> 
    const result = await updateToken({
      credits : Number(user?.credits) - tokenCount,
      uid : user?._id as Id<"users">
    });

    if(user){
      setUser({
        ...user , 
        credits : Number(user?.credits) - tokenCount,
      })
    }
  }

  return (
    <div className="p-6">
      {
        messages.length === 0 ? <EmptyChatState /> : 
        <div
          ref = {chatRef}
          className="h-[80vh] overflow-scroll scrollbar-hide space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div className="flex gap-3 items-start max-w-2xl">
                {msg.role === "assistant" && assistant?.image && (
                  <Image
                    src={assistant.image}
                    alt="assistant"
                    width={40} 
                    height={40}
                    className="rounded-full object-cover h-[30px] w-[30px]"
                  />
                )}
                <div
                  className={`mt-1 p-3 whitespace-pre-wrap overflow-hidden break-words ${
                    msg.role === "user"
                      ? "bg-gray-50 text-black rounded-2xl dark:text-white dark:bg-[#4c4b4b]"
                      : "bg-gray-50 text-black rounded-lg dark:bg-secondary dark:text-white/90"
                  }`}
                >
                  {loading && index === messages.length - 1 ? (
                    <div className="flex items-center gap-2">
                      <Loader2Icon className="animate-spin w-4 h-4 text-gray-500" />
                      <span
                       className = 'dark:bg-[#757576]'
                      >
                        {msg.content}
                      </span>
                    </div>
                  ) : (
                    <div
                      className = 'markdown-body wrap-break-word'
                    >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      <div className="flex justify-between p-5 gap-5 w-full bg-slate-100 rounded-3xl h-[100px] items-center mt-2 dark:bg-[#454549]">
        <Textarea
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none !text-lg resize-none dark:bg-[#454549]"
          placeholder="Ask anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled = {loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleOnSendMessage();
            }
          }}
        />
        <Button 
          className="rounded-full cursor-pointer" 
          onClick={handleOnSendMessage}
          disabled = {loading}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatUI;
