import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CakesPage from './pages/CakesPage'
import AddCakes from './components/AddCakes'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
function App() {
const router=createBrowserRouter([
  {path:"/",element:<Home/>},
  {path:"/about",element:<About/>},
  {path:"/contact", element:<Contact/>},
  {path:"/cakes",element:<AddCakes/>},
  {path:"/menu",element:<CakesPage/>},
  {path:"/order",element:<Orders/>},
  {path:"/cart",element:<Cart/>},
])
  return (
     <RouterProvider router={router}>


     </RouterProvider>
  )
}

export default App
