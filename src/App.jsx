
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Welcome from './ui/Welcome'
import Login from './pages/Login'
import AppLayout from './ui/AppLayout'
import ProjectsPage from './pages/ProjectsPage'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import ChatPage from './pages/ChatPage'
import "./utilites/Storge"



const route = createBrowserRouter([
    {
      path:"/",
      element: <Welcome />
    },
    {
      path:"/login",
      element:<Login />
    },
    {
      path:"/main",
      element:<AppLayout />,
      children:[
        {
          path:"",
          element: <HomePage />
        },
        {
          path:"projects",
          element:<ProjectsPage />
        },
        {
          path:"tasks",
          element: <TasksPage />
        },
        {
          path:"chats",
          element :<ChatPage />
        }
      ]
    },
    {
      path :"/signup",
      element:<Signup />
    }
  ])
function App() {

  return <RouterProvider router={route} />
    
}

export default App
