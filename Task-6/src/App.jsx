import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Cardmodel from './components/Cardmodel'
import Productlist from './components/Productlist'

function App() {
  const [cartitem,setCartitem] = useState([])
  const[isOpen,setIsOpen] = useState(false);
  const cartOpen = () => {
    setIsOpen(true);
  }
  const cartClose = () => {
    setIsOpen(false);
  }
  const removefromcart = (product) =>{
    setCartitem(cartitem.filter((item) => item.id !== product))
  }
 
  
  

  return (
    <Router>
      <nav className='bg-black text-white p-4'>
        <div className='flex items-center justify-between mb-4'>
        <h1 className='text-3xl font-serif'>Black Bird <span className='text-4xl'>𓅫</span></h1>
        </div>
        <div className='flex items-center justify-center gap-20'>
        <input type='text' placeholder='Search 🔎' className='w-4/12 h-10 rounded-full text-center text-black' ></input>
        <Link to ="/" className='bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-800'>Home</Link>
        <Link to ="/cardmodel"  className='bg-white text-black px-4 py-2 rounded-lg hover:border-2 border-blue-500'>🛒 Cart :{cartitem.length}</Link>
        </div>
      </nav>
      <Routes>
      <Route path = "/" element = {<Productlist cartitem ={cartitem} setCartitem ={setCartitem}/>}></Route>
    
        <Route path = "/cardmodel" element = {<Cardmodel cartitem = {cartitem} removefromcart = {removefromcart}/>}></Route>
        
      </Routes>
      
    </Router>
  )
}

export default App
