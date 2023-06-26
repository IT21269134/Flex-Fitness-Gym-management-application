import React, { useContext, useEffect, useReducer, useState , useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Button, Row , Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {useReactToPrint} from "react-to-print"
import { message } from 'antd';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Store } from '../../components/Online-shopping-components/Store';
import { getError } from '../../components/Online-shopping-components/Utils';
import LoadingBox from '../../components/Online-shopping-components/LoadingBox';
import MessageBox from '../../components/Online-shopping-components/MessageBox';
import logger from 'use-reducer-logger'
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
function ProductListScreen() {

 
  const [{loading,error,products} , dispatch ] = useReducer(logger(reducer) , {
    products:[],
    loading:true ,
     error: '',
  })
  const { state } = useContext(Store);
const handleDownloadpdf = useRef()

const GeneratePDf = useReactToPrint({
  content: () =>handleDownloadpdf.current,
 
  documentTitle:"Flex fitness store",
  
  onAfterPrint:() => message.success("Data saved in pdf")
})
  const navigate = useNavigate();





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
  
},[]);

const addToDatabase = () =>{
  navigate('/create')
 
}

const addCoach = () =>{
  navigate('/addCoach')
 
}
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
  },
});
const data = [  ['John', 'Doe', 'john.doe@example.com'],
  ['Jane', 'Smith', 'jane.smith@example.com'],
  ['Bob', 'Johnson', 'bob.johnson@example.com'],
];


const MyDocument = () => (
 
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Flex Fitness</Text>
        <Text>Private limited</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
   
            <View  style={[styles.cell, styles.headerCell]}>
              <Text>Product list</Text>
            </View>
          
        </View>
        {products.map((row, index) => (
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
return (
    <div>
           {/* {loading ? (
        <LoadingBox />
      ) : 
       ( */}
        <>
        
     <div ref = {handleDownloadpdf} style={{width:'100%'}}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>  <Button type="button" onClick={() => navigate(`/update/${product._id}`)} >
                         update product 
                        </Button>
                  </td>
                  <td>  <Button type="button" onClick={() => deleteProduct(product._id)} >
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
            <Button type="button" id = "createButton" onClick={addToDatabase} >
              Create Product
            </Button>
            <Button type="button" id = "createButton" onClick={DownloadHandler} >
              Download csv
            </Button>
            <Button type="button" id = "createButton" onClick={GeneratePDf} >
              Download pdf
            </Button>
            <div>
        
            <PDFDownloadLink document={<MyDocument />} fileName={fileName}>
         Download the pdf
        
      </PDFDownloadLink>
     
            </div>
          </div>
        </Col>
      </Row>
      </>
    </div>
  );
}
export default ProductListScreen