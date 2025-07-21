"use client"

import React from 'react'
import Header from './_components/Header';
import Provider from './provider';
import { usePathname } from 'next/navigation';

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
        {children}
      </div>
    </Provider>
  )
}

export default WorkspaceLayout
