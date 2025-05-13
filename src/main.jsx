import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectProvider } from './Context/ProjectContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ProjectProvider>
      <App />
    </ProjectProvider>
  </StrictMode>,
)
