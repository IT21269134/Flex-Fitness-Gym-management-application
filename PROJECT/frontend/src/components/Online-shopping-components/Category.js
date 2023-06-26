import React, { useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import logger from 'use-reducer-logger'
import "../../pages/Shop_pages/Home.css"
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Products from './Products'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { Button ,  Card,  ListGroup,  Nav} from 'react-bootstrap'
import {getError} from './Utils'
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Rating from './Rating'
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
function Category() {
    const params = useParams();
    const {category} = params;
  const [{loading,error,products} , dispatch ] = useReducer(logger(reducer) , {
    products:[],
    loading:true ,
     error: '',
  })
 
  const [categories, setCategories] = useState([]);
  useEffect(() => {
      const fetchData = async() =>{
        dispatch({type : 'FETCH REQUEST'});
        try {
          const result = await axios.get(`/api/products/Category/${category}`);
          dispatch({type:'FETCH SUCCESS' , payload : result.data})
        } catch (error) {
          dispatch({type:'FETCH FAIL',payload: error.message});
        }
      
       
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
  return (
   
    <div className='Home'>
      <main>
      <Helmet>
       <title>Gym picco</title>
    </Helmet>
     <div className='home__container'>
      <img src = "https://images.wallpaperscraft.com/image/single/gym_weightlifting_disks_118224_2560x1024.jpg"></img>
     </div>
     
	  {/* <div className='products'>{
       <Row>{
       products.map(products => (
        <Col sm = {6} md = {4} lg = {3} className = "mb-3">
             <Products products = {products}></Products>
              </Col>

           ))}
           </Row>
      }
      </div> */}
     
    {products.map((product) => (
       <Row>
        <Col md = {3}>
          <img className='img-large22'
          src = {product.image}
          alt = {product.name}>
          
          </img>
        </Col>
        <Col md = {3}>
          <ListGroup variant = "flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1 id='name'>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating  = {product.rating} numReviews = {product.numReviews}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price :${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
               Save 5%😄
            </ListGroup.Item>
            <ListGroup.Item>
              Category :{product. category}
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md = {3}>
          <Card>
            <Card.Body>
              <ListGroup variant = "flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                   
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                
                </ListGroup.Item>
                {/* {product.countInStock > 0 &&(
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button onClick={addToCartHandler} variant='primary'>
                        Add to cart
                      </Button>

                    </div>
                  </ListGroup.Item>
                )} */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <hr/>
       </Row>
  
          ))}
      </main>
    </div>
    
  )
  
}

export default Category
