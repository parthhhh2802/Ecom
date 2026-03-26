import React, { useEffect } from "react";
import { useContext , useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
        let productsCopy = products.slice();
        productsCopy = productsCopy.filter((item) => category === item.category && subCategory === item.subCategory);
        setRelatedProducts(productsCopy.slice(0,4));
    }
  },[products])

  return (
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1="Related" text2={"Products"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md: grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
            {relatedProducts.map((item , index) => (
                <ProductItem key={index} id={item._id} image={Array.isArray(item.images) ? item.images[0] : item.images} name={item.name} price={item.price} brand={item.brand} />
            ))}
        </div>
    </div>
  );
};

export default RelatedProduct;
