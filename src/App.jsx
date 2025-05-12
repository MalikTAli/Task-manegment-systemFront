
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import AppLayout from './ui/AppLayout'
import ProjectsPage from './pages/ProjectsPage'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'



const route = createBrowserRouter([
    {
      path:"/",
      element:<Login />
    },
    {
      path:"/home",
      element:<AppLayout />,
      children:[
        {
          path:"",
          element: <HomePage />
        },
        {
          path:"projects",
          element:<ProjectsPage />
        }
      ]
    },
    {
      path :"signup",
      element:<Signup />
    }
  ])
function App() {

  return <RouterProvider router={route} />
    
}

export default App
