import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {staleTime: 1000 * 60}
  // }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </StrictMode>,
  </QueryClientProvider>
 
)
