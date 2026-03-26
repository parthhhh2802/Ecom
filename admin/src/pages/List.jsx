import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl as backendURL, currency } from "../App";
import { toast } from "react-toastify";



const List=({token})=>{

  const [list, setList]=React.useState([]);
  const fetchList =async () => {
    try {
      
      const response = await axios.get(backendURL+"/api/product/list"); 
      if (response.data.success) {
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }

      

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct=async(id)=>{
    try {
      const response = await axios.post(backendURL+"/api/product/remove",{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();

      }else{
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    } 
  }

  useEffect(()=>{
    fetchList();
  },[])

  return(
    <>
    <p className="mb-2">
      All Products List
    </p>
    <div className="flex flex-col gap-2">
      {/* List table title */}

      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Brand</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>
      {/* List items */}
      {
        // list.map((item,index)=>(
        //   <div key={index} >
        //     <img src={item.image[0]} alt="" />
        //     <p>{item.name}</p>
        //     <p>{item.category}</p>
        //     <p>{currency}{item.price}</p>
        //     <p>X</p>
        //   </div>
        // ))

        list.map((item,index)=>(
          <div key={index} className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm ">
            <img className="w-16 h-16 object-cover" src={item.images[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.brand || "Other"}</p>
            <p>{currency}{item.price}</p>
            <button onClick={()=>removeProduct(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-md mx-auto">Delete</button>
          </div>
        ))
      }
    </div>

    </>
  )
}
export default List;