import React , {useRef , useCallback} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import  { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../../components/Online-shopping-components/Store';
import { getError } from '../../components/Online-shopping-components/Utils';
import LoadingBox from '../../components/Online-shopping-components/LoadingBox';
import MessageBox from '../../components/Online-shopping-components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function AdminDashBoard() {

  const navigate = useNavigate();
  const chartRef = useRef(null);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          summary: action.payload,
          loading: false,
        };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/products/cat/product-summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  const DownloadHandler = () =>{
    // const chartImageURI = chartRef.current.getImageURI();
    // const link = document.createElement("a");
    // link.href = chartImageURI;
    // link.download = 'chart.png';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    navigate('/productList')

    
   
  } 
  const Trainer = () =>{
  

    navigate('/Trainer_home')

    
   
  } 

  return (

    <div>
      <h1 id = "pad">Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text>Customers</Card.Text>
                </Card.Body>
              </Card >
            </Col>
            <Col md={3}>
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>
                    {summary.trainers && summary.trainers[0]
                      ? summary.trainers[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text>Trainers</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>
                    {summary.Doctors && summary.Doctors[0]
                      ? summary.Doctors[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text>Doctors</Card.Text>
                </Card.Body>
              </Card>
            </Col>
           
            <Col md={3}>
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>
                    {summary.products && summary.products[0]
                      ? summary.products[0].numProduct
                      : 0}
                  </Card.Title>
                  <Card.Text>Total Products</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
         
          
           
         
         
          <div className="my-3">
            <h2 id = "pad">Categories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                ref={chartRef}
                width="100%"
                height="600px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
            <h2 id = "pad">Brands</h2>
            {summary.Brand.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                ref={chartRef}
                width="100%"
                height="600px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.Brand.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}

  

         
    </div>
  
  )
}

export default AdminDashBoard
