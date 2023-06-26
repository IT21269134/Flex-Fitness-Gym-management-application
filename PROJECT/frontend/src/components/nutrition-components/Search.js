import React, { useState } from "react";
import "./search.css";
import nutritionix from "nutritionix-api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search() {
  const YOUR_APP_ID = "436f9151"; //APP ID
  const YOUR_API_KEY = "5835401ca329013154367f0576490742"; //KEY
  nutritionix.init(YOUR_APP_ID, YOUR_API_KEY);

  const [search, setSearch] = useState(""); //state to save search quary
  const [food_name, setFdName] = useState(""); //state to save food names
  const [qty, setQty] = useState(""); //state to save food quantity
  const [calories, setCalories] = useState(""); //state to save calories
  const [totalFat, setTotalFat] = useState(""); //state to save fat
  const [totalCarb, setTotalCarb] = useState(""); //state to save carbs
  const [totalProtein, setTotalProtein] = useState(""); //state to save protein

  const [status, setStatus] = useState(false);

  function setStatusRes() {
    setStatus(true);
  }
  function sendSearchQuery(e) {
    e.preventDefault();
    nutritionix.natural
      .search(search)
      .then((result) => {
        setFdName(result.foods[0].food_name);
        setQty(result.foods[0].serving_qty);
        setCalories(result.foods[0].nf_calories);
        setTotalFat(result.foods[0].nf_total_fat);
        setTotalCarb(result.foods[0].nf_total_carbohydrate);
        setTotalProtein(result.foods[0].nf_protein);
      })
      .catch(() => toast.error('Try Again!'));
  }

  return (
    <div className="search-body-div">
      <ToastContainer />
      <form className="form-inline" onSubmit={sendSearchQuery}>
        <div className="search-div">
          <div className="search-body-secondary-div">
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                id="inputfood"
                placeholder="        Search For Foods"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="search-body-secondary-div">
            <button
              type="submit"
              style={{
                borderRadius: "10px",
                position: "relative",
                backgroundColor: "#CC5801",
                border: "none",
                fontSize: "18px",
                color: "#FFFFFF",
                padding: "10px",
                width: "80px",
                textAlign: "center",
                transitionDuration: "0.4s",
                textDecoration: "none",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={setStatusRes}
            >
              {" "}
              Search{" "}
            </button>
          </div>
        </div>
      </form>

      <div className="result-div">
        <div className="search-results">
          <div className="fetch-data-body">
            {status && (
              <ul className="ul">
                <li className="li" class="card">
                  <l className="item-name" >Food Item :{food_name}</l>
                  
                </li>
                <li className="li" class="card">
                  <l className="item-name" >Quantity : {qty}</l>
                  
                </li>
                <li className="li" class="card">
                  <l className="item-name" >Calories : {calories}</l>
                  
                </li>
                <li className="li" class="card">
                  <l className="item-name" >Carbs : {totalCarb}</l>
                  
                </li>
                <li className="li" class="card">
                  <l className="item-name" >Fat : {totalFat}</l>
                  
                </li>
                <li className="li" class="card">
                  <l className="item-name" >Protein : {totalProtein}</l>
                  
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
