import React, { useEffect, useMemo, useState } from 'react'

function Productlist({cartitem,setCartitem}) {

    const [product,setProduct] = useState([]);
    useMemo(() => {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProduct(data));
    })

    const addcart = (item) => {
      if(cartitem.find((items) => items.id === item.id)){
        alert("Product already in cart !")
      }
        else{
        setCartitem([...cartitem, item]);
      }
    }
  return (
    <div>
        <div className='grid  md:grid-cols-2 bg-gray-300'>
            {product.map((item)=>{
                return (
                  <div key={item.id}className='flex gap-8 m-4 bg-white p-4 rounded-lg'>
                    <img src={item.image} alt={item.title} className='w-44 rounded-md' />
                    <div className='flex flex-col gap-2'>
                    <h2 className='font-semibold text-lg'>{item.title}</h2>
                    <p>{item.category}</p>
                    <p className='text-3xl text-red-600'>${item.price}</p>
                    <hr/>
                    <p className='text-xs  text-gray-700 '>{item.description}</p>
                    <p className='text-gray-500 text-sm'>⭐ {item.rating.rate}</p>
                    <button onClick={() =>addcart(item)} className='bg-blue-500 text-white p-2 rounded-lg  hover:bg-blue-800'>Add to Cart</button>
                    </div>
                  </div>
                )
            })}
        </div>
    </div>
  )
}

export default Productlist