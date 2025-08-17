import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CakesPage from './pages/CakesPage'
import AddCakes from './components/AddCakes'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import EditCake from './components/EditCake'
function App() {
  const cakes = [
    {
      id: 1,
      name: "Chocolate Fudge",
      price: 24.99,
      image: "/chocolate-fudge.jpg",
      flavors: ["chocolate", "fudge"],
      description: "Rich chocolate cake with fudge icing",
      isPopular: true
    }]
  
const router=createBrowserRouter([
  {path:"/",element:<Home/>},
  {path:"/about",element:<About/>},
  {path:"/contact", element:<Contact/>},
  {path:"/addCake",element:<AddCakes/>},
  {path:"/menu",element:<CakesPage/>},
  {path:"/order",element:<Orders cakes={cakes}/>},
  {path:"/cart",element:<Cart/>},
  {path:"/edit-cake/:id",element:<EditCake />},
])
  return (
     <RouterProvider router={router}>


     </RouterProvider>
  )
}

export default App
