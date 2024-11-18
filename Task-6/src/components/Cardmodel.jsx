import React, { useState } from 'react'

function Cardmodel({cartitem,removefromcart}) {
  const [quantity,setQuantity] = useState(1);
  const [totalcost,setTotalcost] = useState(0);

  const handledecrement = () =>{
    if(quantity > 1){
   setQuantity(prevCount => prevCount - 1);
    }
  }
  const handleincrement = () =>{
    if(quantity < 10){
    setQuantity(prevCount => prevCount + 1);
    }
   }

   const totalcostcal = () =>{
    setTotalcost(quantity * cartitem.price)
   }
  
  return (
    <div>
      {cartitem.length > 0 ? (
        <div className='bg-gray-200 p-4'>
          {cartitem.map((lists) => (
            <div key={lists.id} className='flex gap-20 mb-6 p-4 items-center '>
              <img src={lists.image} alt={lists.title} className='w-20 h-20 '></img>
              <div className='text-gray-700 '>{lists.title}</div>
              
                <button type='button' onClick={handledecrement} className='input-group-text bg-gray-500 hover:bg-gray-800 p-1 rounded-full text-white'>-</button>
                <div className='form-control text-center'>{quantity}</div>
                <button type='button' onClick={handleincrement} className='input-group-text bg-gray-500 hover:bg-gray-800 p-1 rounded-full text-white'>+</button>
                <p className='text-green-700 text-lg'> $ {lists.price * quantity}</p>

              
              <button onClick = {() => removefromcart(lists.id)}className='text-black hover:underline hover:text-red-500 ml-20'>☒</button>
            </div>   
          ))}
          </div>
          
          
  ) : (
    <p className='text-gray-600 text-center text-2xl font-semibold mt-4'>Your cart is empty</p>
  )}
</div>
  )
}

export default Cardmodel