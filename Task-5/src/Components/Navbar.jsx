import React from 'react'

function Navbar({ cartOpen ,cartCount}) {
  return (
    <div>
        <nav className='p-4 bg-red-600 text-white flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>One Click Shopping</h1>
            <button onClick = {cartOpen} className='px-4 py-2 bg-yellow-500 rounded-full mr-6 font-semibold text-black'>Cart:{cartCount}</button>
        </nav>
    </div>
  )
}

export default Navbar