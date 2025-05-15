import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectProvider } from './Context/ProjectContext.jsx'
import { FilterAndSearchProvider } from "./Context/FilterAndSearchContext.jsx";
import './index.css'
import App from './App.jsx'
import store from "./store"
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
        <FilterAndSearchProvider>
          <ProjectProvider>
              <App />
            </ProjectProvider>
        </FilterAndSearchProvider>
      </Provider>
  </StrictMode>,
)
