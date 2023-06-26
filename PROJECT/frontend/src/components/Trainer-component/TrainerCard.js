import React from "react";
import styled from "styled-components";
//import Rating from "@material-ui/lab/Rating";
//import { useStateValue } from "../StateProvider";

function Card({ email, name, image, description, nums }) {
  return (
    <Container>
      <br />
      <center>
       <b><h5>{name}</h5></b>
        <Image>
          <img src={`${image}`} alt="Cocherimg " />
        </Image>
        <h5>{email}</h5>
        <Description>
          <h5 style={{ fontSize: "14px", padding :"20px" }}>{description}</h5>
        </Description>
        <button
          onClick={() => window.open(`https://wa.me/0${nums}`, "_blank")}
          style={{
            backgroundColor: "#FD9801",
            color: "#fff",
            width: "200px",
            alignContent: "center",
            padding: "10px 20px",
            borderRadius: "19px",
            border: "none",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Connect
        </button>
      </center>
      <br />
      <br />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  background-color: #fff;
  z-index: 10;
  transition: background-color 0.3s ease; /* Add transition property */

  &:hover {
    background-color: #f7e8d7; /* Define the background color on hover */
  }
`;
/*const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );
    &:nth-child(2) {
      display: none;
    }
    @media only screen and (max-width: 767px) {
      &:nth-child(1) {
        display: none;
      }
      &:nth-child(2) {
        display: block;
        -webkit-mask-image: none;
      }
    }
  }
`;*/
const Image = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex: 0.3;
  img {
    width: 180px;
    height: 200px;
  }
`;
const Description = styled.div`
  width: 80%;
  font-size: 25px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 0.7;
  h5 {
    font-size: 12px;
    font-weight: 400;
  }
  p {
    font-weight: 300;
  }
  button {
    width: 100%;
    height: 33px;
    background-color: #fa8900;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
`;
export default Card;
