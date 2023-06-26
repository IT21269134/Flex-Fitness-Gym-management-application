import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OrderList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('/api/products/orderList');
       setProducts(result.data)
 
      };
      fetchData();
    }, []);
  return (
    <div>
   
     
        <>
     
          <table className="table">
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>description</th>
                <th>phoneNumber</th>
                <th>country</th>
               
                
                <th>address</th>
                <th>city</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
               <tr key={product._id}>
                  
                  <td  id = "Card-h">{product.name}</td>
                  <td  id = "Card-h">{product.price}</td>
                  <td  id = "Card-h">{product.category}</td>
                  <td  id = "Card-h">{product.description}</td>
                  <td  id = "Card-h">{product.phoneNumber}</td>
                  <td  id = "Card-h">{product.country}</td>
                  <td  id = "Card-h">{product.address}</td>
                  <td  id = "Card-h"> {product.city}</td>
                  
                 
                 
                </tr>
              ))}
            </tbody>
          </table>
          
        </>
      
    </div>
  )
}

export default OrderList
