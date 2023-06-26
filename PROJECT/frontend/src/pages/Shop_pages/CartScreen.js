import axios from 'axios';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react';
import { Button, Card, Col , ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../../components/Online-shopping-components/MessageBox';
import { Store } from '../../components/Online-shopping-components/Store';
import {message} from 'antd'

function CartScreen() {
    const navigate = useNavigate();
    const {state , dispatch : ctxDispatch} = useContext(Store);
    const {
        cart : {cartItems},
    } = state;
    const updateCartHandler = async(item , quantity) =>{
        const {data} = await axios.get(`/api/products/${item._id}`);
        if(data.countInStock <quantity){
            message.error('Sorry the product is out of stock');
            return
          }
          ctxDispatch({type : 'CART_ADD_ITEM' , payload: {...item , quantity}})
    }
    const removeItemHandler = (item) =>{
        ctxDispatch({type : 'CART_REMOVE_ITEM' , payload : item})
    }
    const checkoutHandler = () => {
        navigate('/payment_');
      };
  return (
    <div>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>
    <h1 id = "shopping">Shopping Cart</h1>
    <Row>
        <Col md = {8}>
            {cartItems.length === 0 ? (
                <MessageBox/>
            ):
            (
                <ListGroup>
                    {cartItems.map((item => (
                        <ListGroup.Item key = {item._id}>
                            <Row className='align-items-center'>
                                <Col md = {4}>
                                    <img
                                    src = {item.image}
                                    alt = {item.name} 
                                    className = "img-fluid rounded img-thumbnail" id='cart_image'>   
                                    </img> {' '}
                                    <Link to = {`/product/${item.id}`}>{item.name}</Link>
                                </Col>
                                <Col md = {3}>
                                    <Button  
                                       onClick={() => 
                                        updateCartHandler(item , item.quantity -1)
                                        } 
                                        variant = "light"
                                        disabled = {item.quantity === 1}>
                                        <i className='fas fa-minus-circle'/>
                                    </Button>{' '}
                                    <span>{item.quantity}</span>{' '}
                                    <Button variant = "light"
                                    onClick={() => 
                                    updateCartHandler(item , item.quantity + 1)
                                    } >
                                        <i className='fas fa-plus-circle'/>
                                    </Button>
                                </Col>
                                <Col md = {3}>${item.price}</Col>
                                <Col md = {2}>
                                <Button variant = "light"
                                onClick={() => removeItemHandler(item)} >
                                        <i className='fas fa-trash'/>
                                    </Button> 
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )))}
                </ListGroup>
            )}
        </Col>
        <Col md = {4}>
                                   <Card>
                                    <Card.Body>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                            <h3 id='name'>
                                                Sub total ({cartItems.reduce((a,c) => a + c.quantity , 0)}{' '}
                                                items ): $
                                                {cartItems.reduce((a,c) => a + c.price*c.quantity, 0)}
                                                
                                            </h3>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <div className='d-grid'>
                                                    <Button
                                                    id = "card_btn22"
                                                    type='button'
                                                    variant = 'primary'
                                                    onClick={checkoutHandler}
                                                    disabled = {cartItems.length === 0}>Proceed to Checkout </Button>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                    </Card> 
                                </Col>
    </Row>

      
    </div>
  )
}

export default CartScreen
