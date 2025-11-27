import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './styles.css'

if (import.meta.env.DEV) {
  // start MSW in dev with explicit service worker URL so Vite serves the file
  try {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    })
    console.log('[MSW] worker started')
  } catch (err) {
    // provide additional debugging info when SW registration fails
    // common cause: dev server not serving the file or wrong path
    // advise clearing existing service workers if needed
    // eslint-disable-next-line no-console
    console.error('[MSW] Failed to start the worker:', err)
  }
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
