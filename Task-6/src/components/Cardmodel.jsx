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

  
  return (
    <div>
      {cartitem.length > 0 ? (
        <div className='bg-gray-200 p-4'>
          {cartitem.map((lists) => (
            <div key={lists.id} className='flex flex-wrap gap-10 mb-6 p-2 items-center '>
              <img src={lists.image} alt={lists.title} className='w-24'></img>
              <div className='flex flex-col gap-2 w-2/12'>
              <div className='text-gray-700'>{lists.title}</div>
              </div>
              
                <button type='button' onClick={handledecrement} className='input-group-text bg-gray-500 hover:bg-gray-800 p-1 rounded-full text-white'>-</button>
                <div className='form-control text-center'>{quantity}</div>
                <button type='button' onClick={handleincrement} className='input-group-text bg-gray-500 hover:bg-gray-800 p-1 rounded-full text-white'>+</button>
               
                <p className='text-green-700 text-lg'> $ {lists.price * quantity}</p>

              
              <button onClick = {() => removefromcart(lists.id)}className='text-red-500 hover:underline '>Remove</button>
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