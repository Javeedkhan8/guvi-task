import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Productlist from './Components/Productlist'
import Cartmodel from './Components/Cartmodel'

function App() {
  const [cartitem,setCartitem] = useState([])
  const [isCartOpen,setIsCartOpen] = useState(false);

  const cartOpen = () =>{
    setIsCartOpen(true);
  }
  const cartClose = () =>{
    setIsCartOpen(false);
  }

  const removefromcart = (product) =>{
    setCartitem(cartitem.filter((item) => item.id !== product))
  }

  return (
    <div className='bg-red-100 min-h-screen'>
      <Navbar cartCount = {cartitem.length} cartOpen= {cartOpen}/>
      <Productlist cartitem = {cartitem} setCartitem = {setCartitem}/>
      {
        isCartOpen && (
          <Cartmodel cartitem = {cartitem} cartClose = {cartClose} removefromcart = {removefromcart}/>
        )
      }
      
    </div>
  )
}

export default App
