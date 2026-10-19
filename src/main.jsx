import { useState, useEffect, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AgentsProvider } from './lib/useAgents'
import App from './App'
import Preloader from './components/Preloader'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AgentsProvider>
        <PreloaderApp />
      </AgentsProvider>
    </BrowserRouter>
  </StrictMode>
)

function PreloaderApp() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPreloaderDone(true), 2200)
    return () => clearTimeout(t)
  }, [])

  if (!preloaderDone) {
    return <Preloader onFinish={() => setPreloaderDone(true)} />
  }

  return <App />
}
