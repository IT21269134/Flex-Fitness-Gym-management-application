import React , { useContext, useEffect, useReducer, useState , useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

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
import logger from 'use-reducer-logger'
import { Document, Page, Text, View, StyleSheet, PDFViewer,Image } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {useReactToPrint} from "react-to-print"
import { message } from 'antd';
import BannerImage from "../../assets/images/home-banner-image.png";
import "./Home.css"
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'
function AdminDashBoard() {
    const handleDownloadpdf = useRef()

    const GeneratePDf = useReactToPrint({
      content: () =>handleDownloadpdf.current,
     
      documentTitle:"Flex fitness store",
      
      onAfterPrint:() => message.success("Data saved in pdf")
    })
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{loading,error,products} , dispatch ] = useReducer(logger(reducer) , {
    products:[],
    loading:true ,
     error: '',
  })
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/products', {
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
  const  mappedArray = products.map((item) => [item.name , item.brand,item.category,item.price])
const addToDatabase = () =>{
    navigate('/create')

   
  }
  
  const currentDate = new Date().toLocaleDateString();
  const deleteProduct = (id) =>{
    axios.delete(`api/products/delete/${id}`)
    window.location.href = '/productList';
  }
  const DownloadHandler = () => {
   
    const csvData = [
      ["Image", "Name", "Price" , "Category", "Brand" ],
         products.map((product)  => [product.image,product.name, product.price, product.category , product.brand]),
    ];
    const csv = csvData.map((row) => row.join(",")).join("\n");
    
    const element = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "Shop.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },
    pad:{
paddingBottom:'20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    footer: {
      textAlign: 'center',
      marginTop: 10,
    },
    footerText: {
      fontSize: 12,
    },
    table: {
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
      paddingBottom: 5,
      paddingTop: 5,
    },
    cell: {
      flex: 1,
      
    },
    headerCell: {
      fontWeight: 'bold',
      color:'green'
    },
    logo:{
      width: 100,
      height: 100,
    }
  });
 
 

  const MyDocument = () => (
 
    <Document>
        
      <Page style={styles.page}>
        <View style={styles.header}>
        <Image
        style={styles.logo}
        source={ BannerImage }
      />
          <Text style={styles.headerText}>Flex Fitness</Text>
          <Text>Private limited</Text>
          <Text>{currentDate}</Text>
          <View  style={[styles.cell, styles.headerCell,styles.pad]}>
                <Text >Product list</Text>
              </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
          <View style={[styles.cell, styles.headerCell]}>
          <Text>Product name</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>brand</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>category</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>price</Text>
        </View>
             
            
          </View>
         
          {mappedArray.map((row, index) => (
            <View key={index} style={styles.row}>
              {row.map((cell, index) => (
                <View key={index} style={styles.cell}>
                  <Text>{cell}</Text>
               </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>contact me -- 07122332223</Text>
        </View>
      </Page>
    </Document>
  );
  const fileName = 'mytable.pdf';
  const Trainer = () =>{
  

    navigate('/Trainer_home')

    
   
  } 

  
 
 


 



  return (

    <div>
     
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
         <div ref = {handleDownloadpdf} style={{width:'100%'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>UPDATE Products</th>
                <th>DELETE PRODUCTS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td><img id = "adminimage"src={product.image}></img></td>
                  <td id = "Card-h">{product.name}</td>
                  <td id = "Card-h">{product.price}</td>
                  <td id = "Card-h">{product.category}</td>
                  <td id = "Card-h">{product.brand}</td>
                  <td>  <Button type="button"    id = "card_btn22"onClick={() => navigate(`/update/${product._id}`)} >
                         update product 
                        </Button>
                  </td>
                  <td>  <Button type="button"    id = "card_btn22" onClick={() => deleteProduct(product._id)} >
                         delete product
                        </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Row>
        
        <Col className="col text-mid">
          <div id = "createButton">
            <Button type="button" id = "prbtn" onClick={addToDatabase} >
              Create Product
            </Button>
            <Button type="button" id = "prbtn" onClick={DownloadHandler} >
              Download csv
            </Button>
            <Button type="button" id = "prbtn" onClick={GeneratePDf} >
              Print pdf
            </Button>
            <PDFDownloadLink document={<MyDocument />} fileName={fileName}>
         <Button id = "prbtn">Download pdf</Button>
        
      </PDFDownloadLink>
      
            <div>
     
    </div>
          </div>
        </Col>
      </Row>

        </>
      )}
  
  

         
    </div>
  
  )
}


export default AdminDashBoard
