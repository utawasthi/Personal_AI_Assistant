import React from 'react'
import Header from './_components/Header';
import Provider from './provider';

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <div>
        <Header />
        {children}
      </div>
    </Provider>
  )
}

export default WorkspaceLayout
