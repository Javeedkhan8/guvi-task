import React from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.jpg'

function Header() {
  return (
    <header className='bg-gray-800 text-white p-4'>
        <div className='container flex mx-auto justify-between'>
           <h1 className='text-3xl font-bold '>Movie Couch</h1>
            <nav className='flex gap-4'>
                <Link to ="/" className='mr-4 hover:underline text-blue-500'>Search</Link>
                <Link to ="/favourite" className='hover:underline text-blue-500'>Favourite</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header