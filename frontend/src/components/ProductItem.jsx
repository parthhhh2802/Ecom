import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // Assuming you're using react-router-dom
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id,  image, name, price, brand }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      {/* Fixed square image container so all items have same width & height */}
      <div className="w-full flex items-center justify-center bg-gray-50 overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <img className="w-full h-full object-contain transition-transform duration-200 hover:scale-105" src={image} alt={name} />
      </div>
      <p className='pt-3 text-[10px] text-rose-500 font-bold uppercase tracking-wider'>{brand || "Other"}</p>
      <p className='pt-1 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
  
}

export default ProductItem;