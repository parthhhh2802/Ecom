import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  

  const toggleCategory = (e) => {
    if (categoryFilter.includes(e.target.value)) {
      setCategoryFilter(
        categoryFilter.filter((item) => item !== e.target.value)
      );
    } else {
      setCategoryFilter([...categoryFilter, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategoryFilter.includes(e.target.value)) {
      setSubCategoryFilter(
        subCategoryFilter.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategoryFilter([...subCategoryFilter, e.target.value]);
    }
  };
  const applyFillter = () => {
    let productsCopy = products.slice();

    if (showSearch && search.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        categoryFilter.includes(item.category)
      );
    }
    if (subCategoryFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategoryFilter.includes(item.subCategory)
      );
    }
    if (sortOption === "price-asc") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      productsCopy.sort((a, b) => b.price - a.price);
    }
    setFilterProducts(productsCopy);
  };
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);
  // useEffect(() => {
  //   setFilterProducts(products);
  // },[sortOption]);
  useEffect(() => {
    setFilterProducts(products);
  }, [search, showSearch]);

  useEffect(() => {
    applyFillter();
  }, [categoryFilter, subCategoryFilter, search, showSearch, sortOption , products]);

  return (
    <div className="flex flex-row items-start my-10 gap-6 sm:gap-10 pt-10 border-t border-gray-200">
      {/* Filter option */}
      <div className="min-w-60 ">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex item-center cursor-pointer gap-2"
        >
          Filters
        </p>
        <img
          src={assets.dropDown_icon}
          alt="filter"
          className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`}
        />
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-4 mt-5 cursor-pointer ${showFilter ? "" : "hidden"
            } sm: block`}
        >
          <p className="mb-3 text-sm font-medium">Category</p>
          <div className="flex flex-col gap-2 pb-4 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                type="checkbox"
                id="category1"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              <label htmlFor="category1">Men</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                id="category2"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              <label htmlFor="category2">Women</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                id="category3"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <label htmlFor="category3">Kids</label>
            </p>
          </div>
          {/* sub category filter */}
          <p className="mb-3 text-sm font-medium">Sub Category</p>
          <div className="flex flex-col gap-2 pb-4 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                type="checkbox"
                id="subcategory1"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              <label htmlFor="subcategory1">Topwear</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                id="subcategory2"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              <label htmlFor="subcategory2">Bottomwear</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                id="subcategory3"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              <label htmlFor="subcategory3">Winterwear</label>
            </p>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={<span>All</span>} text2={"Collections"} />
          {/* Product Sorting */}
          <select
            className="border border-gray-300 px-2 sm:px-4 py-1 text-sm sm:text-base"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {filterProducts?.filter(Boolean).map((item) => (
            <div key={item?._id||item?.id} className="border p-2">
              <ProductItem
                id={item?._id || item?.id}
                image={item?.images?.[0] || item?.image?.[0] || ""}
                name={item?.name || ""}
                price={item?.price ?? 0}
                brand={item?.brand || ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;