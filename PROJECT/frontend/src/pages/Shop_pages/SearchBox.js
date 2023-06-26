import React, { useState , useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form , Button, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'



function SearchBox() {
    const navigate = useNavigate();
 
    const [query , setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const submitHandler = (e) =>{
        e.preventDefault();
        // navigate(query ? `/search/?query = ${query}` : '/search')
        // dispatchEvent()
        navigate(`/search/${query}`)
        
    }
    // useEffect(() => {
    //    const  fetchSuggestions = async() => {
    //     const response = await fetch(`/api/products/searching?q=${query}`);
    //     const results = await response.json();
    //     setSuggestions(results);
    //   };
    //   fetchSuggestions();
    // },[query]);
     
   
  return (
    <div>
    <Form classname = "d-flex me-auto"  onSubmit = {submitHandler}>
       <InputGroup>
       <FormControl type = "text" name = "q" id = "edit" onChange={(e) => setQuery(e.currentTarget.value)}
       placeholder = "search Products"
       aria-label = "Search Products"
       aria-describeby = "button-search">
        {/* {suggestions.map((suggestion) => (
        <div >{suggestion}</div>
      ))} */}
    </FormControl>
    <Button variant='outline-primary' type = "submit" >
        <i className='fas fa-search'></i>
     
    </Button>
       </InputGroup>
    </Form>
    </div>
  )
}

export default SearchBox
