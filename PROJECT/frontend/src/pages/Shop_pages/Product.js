import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useContext, useEffect, useReducer , useRef , useState } from 'react'
import { useNavigate, useParams , Link, } from 'react-router-dom';
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card, ListGroup,Badge, Button , Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../components/Online-shopping-components/Store';
import Rating from '../../components/Online-shopping-components/Rating';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import MessageBox from '../../components/Online-shopping-components/MessageBox';
import LoadingBox from '../../components/Online-shopping-components/LoadingBox';
import { getError } from '../../components/Online-shopping-components/Utils';
import {motion} from "framer-motion";
import { message } from "antd";
import "./product.css"
import { toast } from 'react-toastify';
const reducer = (state , action) => {
  switch(action.type){
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
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
function Product() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
    const params = useParams();
    const {id} = params; 
    const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
    // const [products , setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async() =>{
          dispatch({type : 'FETCH REQUEST'});
          try {
            const result = await axios.get(`/api/products/id/${id}`);
            dispatch({type:'FETCH SUCCESS' , payload : result.data})
          } catch (error) {
            dispatch({type:'FETCH FAIL',payload: error.message});
          }
        
          //setProducts(result.data);
        };
        fetchData();
    },[id]);
    const {state , dispatch : ctxDispatch} = useContext(Store);
    const {cart , userInfo} = state;
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
    const submitHandler = async (e) => {
      e.preventDefault();
      if (!comment || !rating) {
        message.error('Please enter comment and rating');
        return;
      }
      try {
        const { data } = await axios.post(
          `/api/products/${product._id}/reviews`,
          { rating, comment, name: userInfo.name },
         
        );
  
        dispatch({
          type: 'CREATE_SUCCESS',
        });
        message.success("Review submit succesfully");
        // toast.promise(registerPromise, {
        //   loading: "Creating...",
        //   success: <b>Register Successfully..! </b>,
        //   error: <b>Could not register.</b>,
        // });
        product.reviews.unshift(data.review);
        product.numReviews = data.numReviews;
        product.rating = data.rating;
        dispatch({ type: 'REFRESH_PRODUCT', payload: product });
        window.scrollTo({
          behavior: 'smooth',
          top: reviewsRef.current.offsetTop,
        });
      } catch (error) {
       
        dispatch({ type: 'CREATE_FAIL' });
      }
    };
  return (
    loading? (<div></div>
     ) : error ? (<div>{error}</div> 
    
    ):( <motion.div initial = {{opacity:0}}
                    animate = {{opacity:2}}
                    exit = {{opacity:0}}>
          
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
              <h1 id='names'>{product.name}</h1>
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
                      <Button onClick={addToCartHandler} variant='primary' id = "card_btn22">
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
       <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit" id = "card_btn22">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product.id}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
     
      
    </motion.div>
    )
  )
}

export default Product
