import React from 'react'

function Cartmodel({ cartitem,cartClose,removefromcart}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white p-6 rounded-lg w-80 shadow-xl'>
            <h2 className='text-xl font-bold text-red-600 mb-4'> Your Cart</h2>
            {cartitem.length > 0 ? (
                <div>
                    {cartitem.map((lists) => (
                        <div key={lists.id} className='flex justify-between items-center mb-2'>
                            <img src={lists.image} alt={lists.title} className='w-12 h-12 '></img>
                            <div className='text-gray-700'>{lists.title}</div>
                            <button onClick={() => removefromcart(lists.id)} className='text-red-500 hover:underline'>Remove</button>
                        </div>
                    ))}

                </div>


            ):(<p className='text-gray-600'> Your cart is Empty</p>)
            
            }

            <button onClick={cartClose} className='w-full px-4 py-2 bg-blue-600 mx-auto rounded-full text-white font-semibold'>Close</button>

        </div>

    </div>
  )
}

export default Cartmodel