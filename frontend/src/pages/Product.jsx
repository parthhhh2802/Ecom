import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    try {
      const found =
        products && products.length
          ? products.find((p) => String(p._id) === String(productId))
          : null;

      if (found) {
        setProductData(found);
        setImage(
          Array.isArray(found.images)
            ? found.images[0] || ""
            : found.images || ""
        );
        return;
      }

      // If product not found in loaded products, request single product from backend
      if (!backendUrl) {
        setProductData(null);
        console.error("Product not found and backend URL is missing");
        return;
      }

      const res = await fetch(backendUrl + "/api/product/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data && data.success && data.product) {
        setProductData(data.product);
        const foundImage = Array.isArray(data.product.images)
          ? data.product.images[0] || ""
          : data.product.images || "";
        setImage(foundImage);
      } else {
        setProductData(null);
        console.error("Product not found");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setProductData(null);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (productData === false) return <div className="opacity-0"></div>;
  if (productData === null)
    return (
      <div className="py-20 text-center text-gray-600">Product not found</div>
    );

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`thumb-${index}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image || ""} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="text-rose-500 mt-1">Brand: {productData.brand || "Other"}</p>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="stars" className="w-3 5" />
            <img src={assets.star_icon} alt="stars" className="w-3 5" />
            <img src={assets.star_icon} alt="stars" className="w-3 5" />
            <img src={assets.star_icon} alt="stars" className="w-3 5" />
            <img src={assets.star_icon} alt="stars" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size :</p>
            <div className="flex gap-2">
              {/* Example sizes, you can modify as needed */}
              {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`border rounded-md px-4 py-2 bg-gray-50 hover:bg-gray-300  ${
                        item === size ? "border-rose-500 text-rose-600" : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))
                }
            </div>
          </div>
          <button
            className="bg-rose-500 text-white py-2 px-4 rounded-md active:bg-rose-400"
            onClick={() => addToCart(productData._id, size)}
          >
            Add to cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex-col gap-1">
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and review section */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce product page typically includes a description and
            reviews section.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            adipisci sapiente optio autem, repellendus eum maiores dolorum
            voluptatibus aperiam minima a. Deleniti consequatur in similique
            neque aliquid fuga quo et.
          </p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
