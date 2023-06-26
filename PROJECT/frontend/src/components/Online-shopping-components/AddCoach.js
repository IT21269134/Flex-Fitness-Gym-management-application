import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

function AddCoach() {
  const [name , setname] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');

    const submitHandler =() =>{
      axios.post(
         '/api/users/addCoach',
         {name : name ,email : email , password : password , isAdmin : false , isCoach :true
         ,isDoctor : false },
         );
       
    
    
    }
  return (
    <div>
     <Container className="small-container">
    <Helmet>
       <title>Sign out</title>
     </Helmet>
     <h1 className="my-3">Add Coach</h1>
     <Form onSubmit={submitHandler}>
     <Form.Group className="mb-3" controlId="text" >
          <Form.Label>name</Form.Label>
          <Form.Control type="text" required onChange={(e) => setname(e.target.value)} />
        </Form.Group>       
        <Form.Group className="mb-3" controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        
      </Form>
   </Container>
</div>
  )
}

export default AddCoach
