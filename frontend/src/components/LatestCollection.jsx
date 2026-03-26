import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'; // Make sure this path and casing is correct

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Only run this code if products is a valid array
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 4));
    }
  }, [products]); // Add products to the dependency array

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Latest'} text2={'Collection'} />
        <p className='w-3/4 m-auto sm:text-sm md:text-base text-gray-600'>
          Discover our newest arrivals. Fresh styles and modern designs to update your wardrobe with the latest trends.
        </p>
      </div>
      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {latestProducts.map((item,index) => (
          <ProductItem 
            key={index}
            id={item._id}
            image={item.images[0]}
            name={item.name}
            price={item.price}
            brand={item.brand}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;