import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './styles.css'
import { SelectedProvider } from './context/SelectedContext'


const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
<SelectedProvider>
<App />
</SelectedProvider>
</QueryClientProvider>
</React.StrictMode>
)