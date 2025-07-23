"use client"

import React from 'react'
import Header from './_components/Header';
import Provider from './provider';
import { usePathname } from 'next/navigation';
import { ChatInputContext, ChatInputProvider } from '@/context/ChatInputContext';
import { MessageProvider } from '@/context/MessageContext';

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  const pathName = usePathname();
  const showHeader = !pathName.startsWith('/workspace');

  return (
    <Provider>
      <div>
        {showHeader && <Header />}
        <ChatInputProvider>
          <MessageProvider>
            {children}
          </MessageProvider>
        </ChatInputProvider>
      </div>
    </Provider>
  )
}

export default WorkspaceLayout
