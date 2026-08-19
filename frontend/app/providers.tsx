'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const ClientProvider = new QueryClient()

interface ClientProps{
    children: React.ReactNode
}

export function ClientProviders({children}:ClientProps){
    return(
        <QueryClientProvider client={ClientProvider}>
            {children}
        </QueryClientProvider>
        
    )
}