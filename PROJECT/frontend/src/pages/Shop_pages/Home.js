import React, { useEffect, useReducer, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import logger from 'use-reducer-logger'
import videoBgg from "../../assets/videos/1.3.mp4"
import "./Home.css"
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Products from '../../components/Online-shopping-components/Products'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { Button ,  Nav} from 'react-bootstrap'
import {getError} from '../../components/Online-shopping-components/Utils'
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  Input } from "antd";
import SearchBox from './SearchBox'
const { Search } = Input;
const reducer = (state , action) => {
  switch(action.type){
    case 'FETCH REQUEST':
       return {...state , loading : true};
    case 'FETCH SUCCESS':
        return {...state , products : action.payload , loading :false}
    case 'FETCH FAIL':
          return {...state , loading :false , error:action.payload}   
    default:
      return state;
  }
}
function Home() {
  const [{loading,error,products} , dispatch ] = useReducer(logger(reducer) , {
    products:[],
    loading:true ,
     error: '',
  })
  const navigate = useNavigate();
  // const [products , setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const CategoryHandler = (category) =>{
    navigate(`/Category/${category}`)
  }
  useEffect(() => {
      const fetchData = async() =>{
        dispatch({type : 'FETCH REQUEST'});
        try {
          const result = await axios.get('/api/products');
          dispatch({type:'FETCH SUCCESS' , payload : result.data})
        } catch (error) {
          dispatch({type:'FETCH FAIL',payload: error.message});
        }
      
        //setProducts(result.data);
      };
      fetchData();
      const fetchCategories = async () => {
        try {
          const { data } = await axios.get(`/api/products/categories`);
           setCategories(data);
        } catch (err) {
          toast.error(getError(err));
        }
      };
      fetchCategories();
  },[]);
  const [query , setQuery] = useState('');
    
    const submitHandler = (e) =>{
        e.preventDefault();
        // navigate(query ? `/search/?query = ${query}` : '/search')
        // dispatchEvent()
        navigate(`/search/${e}`)
        
    }
  return (
   
    <div className='Home'>
      <main>
      <Helmet>
       <title>Flex Fitness</title>
    </Helmet>
     <div className='home__container'>
       {/* <img src = "https://images.wallpaperscraft.com/image/single/gym_weightlifting_disks_118224_2560x1024.jpg"></img>  */}
       <video id = "borderr"src= {videoBgg } autoPlay loop muted></video>
     </div>
     <div className="contenttt">
     <div className='category'>
      Categories
      </div>
    
      <div className="cat-container">
   {categories.map((category) => (
     <div key={category} className = "cat">
             
           
         <Button type="button" id = "card_btn22" onClick={() =>CategoryHandler(category)}>{category}</Button> 
         
              
             </div>
             
            ))}
            
            
            </div>
<div id = "padd">
	  <SearchBox/>
          </div> 
	 
	
	 
   
  
      <div className='products'>{
       <Row>{
       products.map(products => (
        <Col sm = {6} md = {4} lg = {3} className = "mb-3">
             <Products products = {products}></Products>
              </Col>

           ))}
           </Row>
      }
      </div>
      </div>
      </main>
    </div>
   
    
  )
  
}

export default Home