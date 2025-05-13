import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectProvider } from './Context/ProjectContext.jsx'
import { FilterAndSearchProvider } from "./Context/FilterAndSearchContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterAndSearchProvider>
      <ProjectProvider>
          <App />
        </ProjectProvider>
    </FilterAndSearchProvider>
  </StrictMode>,
)
