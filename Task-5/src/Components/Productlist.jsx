import React, { useEffect, useState } from 'react'

function Productlist({setCartitem,cartitem}) {
    const [product,setProduct] = useState([])
    console.log(product)
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => setProduct(data))
        console.log(product);
    },[])

    const addCart = (item) =>{
        if(cartitem.find((items) => items.id === item.id)){
            alert('Product already in Cart !');
        }
        else {
        setCartitem([...cartitem, item]);
        }

    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4'>
        {product.map((item) => (
        <div key = {item.id}className='p-4 bg-white shadow-gray-400 rounded-lg '>
        <img src={item.image} className='h-40 mx-auto my-4'></img>
        <h2 className='font-semibold text-gray-8 text-lg'>{item.title}</h2>
        <p className='text-sm text-gray-800 mb-4'> Category : {item.category}</p>
        <p className='text-green-600 font-bold mb-4'>${item.price}</p>
        <button onClick={() => addCart(item)} className='bg-blue-500 w-full rounded-full text-white font-semibold p-2'>Add to Cart</button>


        </div>
        ))}
    </div>
  )
}

export default Productlist