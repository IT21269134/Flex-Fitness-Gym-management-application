import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card, ListGroup,Badge, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from './Store';
import Rating from './Rating';
const reducer = (state , action) => {
  switch(action.type){
    case 'FETCH REQUEST':
       return {...state , loading : true};
    case 'FETCH SUCCESS':
        return {...state , product : action.payload , loading :false}
    case 'FETCH FAIL':
          return {...state , loading :false , error:action.payload}   
    default:
      return state;
  }
}
function Search() {
  const navigate = useNavigate();
    const params = useParams();
    const {id} = params; 
    const [{loading,error,product} , dispatch ] = useReducer((reducer) , {
      product:[],
      loading:true ,
       error: '',
    })
    // const [products , setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async() =>{
          dispatch({type : 'FETCH REQUEST'});
          try {
            const result = await axios.get(`/api/products/search/${id}`);
            dispatch({type:'FETCH SUCCESS' , payload : result.data})
          } catch (error) {
            dispatch({type:'FETCH FAIL',payload: error.message});
          }
        
          //setProducts(result.data);
        };
        fetchData();
    },[id]);
    const {state , dispatch : ctxDispatch} = useContext(Store);
    const {cart} = state;
    const addToCartHandler = async() =>{
      const existITem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existITem ? existITem.quantity + 1 : 1;
      const {data} = await axios.get(`/api/products/${product._id}`);
      if(data.countInStock <quantity){
        window.alert('Sorry the product is out of stock');
        return
      }
      ctxDispatch({type : 'CART_ADD_ITEM' , payload: {...product , quantity}})
      navigate('/cart')
    }
  return (
    loading? (<div>loading...</div>
     ) : error ? (<div>{error}</div> 
    
    ):( <div>
       <Row>
        <Col md = {6}>
          <img className='img-large'
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
                  <Row>
                    <Col>Status :</Col>
                    <Col>{product.countInStock > 0?
                     <Badge bg = "success">In Stock</Badge> 
                     : 
                     <Badge bg = "danger">Unavailable</Badge> 
                  }</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 &&(
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button onClick={addToCartHandler} variant='primary'>
                        Add to cart
                      </Button>

                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
       </Row>
    </div>
    )
  )
}

export default Search
