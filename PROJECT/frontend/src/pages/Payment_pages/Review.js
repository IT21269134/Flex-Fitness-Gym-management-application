import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../components/Online-shopping-components/Store";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { message } from "antd";
import { getError } from "../../components/Online-shopping-components/Utils";
import LoadingBox from "../../components/Online-shopping-components/LoadingBox";
import MessageBox from "../../components/Online-shopping-components/MessageBox";
function Review() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return {
          ...state,
          summary: action.payload,
          loading: false,
        };
      case "FETCH_SUCCESSS":
        return {
          ...state,
          payment: action.payload,
          loading: false,
        };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{ loading, summary, payment, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/getalladdresses", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  const mappedArray = cartItems.map((item) => [
    item.brand,
    item.category,
    item.price,
  ]);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry the product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkoutHandler = () => {
    navigate("/payment_");
  };

  const order = () => {};

  const addToList = () => {
    axios.post("/api/orders/", { mappedArray });

    navigate("/shophome");
    message.success("Order placed");
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={4}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded img-thumbnail"
                      id="cart_image"
                    ></img>{" "}
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>

                  <Col md={3}>${item.price}</Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      onClick={() => removeItemHandler(item)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                <h6 id="name">
                  Sub total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  items ): $
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h6>
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payement
              </Typography>
              <Typography>{userInfo.name}</Typography>
              <Button onClick={addToList}>Place Order</Button>
              {/* {payment.map((shipping) => (
                  
            
                  <Card className='custom-card'>
                  
                   <Card.Body>
                 
                    <Card.Title className='title1'>
                     {shipping.cardNumber}
                    </Card.Title>
                    
                  
                   
                   
                  
                    </Card.Body>
                    
                  </Card>

                 
                
                
              
                  
            
               
              ))} */}
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping
              </Typography>
              <Grid container>
                {summary.map((shipping) => (
                  <Card className="custom-card">
                    <Card.Body>
                      <Card.Title className="title1">
                        {shipping.name}
                      </Card.Title>

                      <Card.Text>{shipping.address}</Card.Text>

                      <Card.Text>{shipping.country}</Card.Text>
                      <Card.Text>{shipping.city}</Card.Text>
                      <Card.Text>{shipping.state}</Card.Text>
                      <Card.Text>{shipping.postalCode}</Card.Text>
                      <Card.Text>{shipping.date}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default Review;
