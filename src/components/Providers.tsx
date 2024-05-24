"use client";

import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


type Props = {
  children: ReactNode;
}

const client = new QueryClient();

function Providers({children}: Props) {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers