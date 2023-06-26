import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/Trainer-component/TrainerCard";
import Footer from "../../components/Online-shopping-components/Footer";

function TrainerAD() {
  const [coaches, setcoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const coachData = await axios.get(
        "http://localhost:4000/Trainer/TrainerAD"
      );
      console.log(coachData);
      setcoaches(coachData.data);
      setFilteredCoaches(coachData.data);
    };
    fetchdata();
  }, []);

  const filterCoaches = (value) => {
    const filteredCoaches = coaches.filter((coach) =>
      coach.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchTerm(value);
    setFilteredCoaches(filteredCoaches);
  };
  return (
    <div>
      <div className="home-text-sectio">
        <p className="primary-text">Contact Your Trainer</p>
        <center>
          <SearchBar style={{ paddingLeft: '20px' }}>
            <input
              type="text"
              placeholder="Find your Trainer"
              value={searchTerm}
              onChange={(e) => filterCoaches(e.target.value)}
            />
          </SearchBar>
        </center>
        <Container>
          <Banner>
            <img
              src="https://flexfitnes-img.s3.ap-northeast-1.amazonaws.com/coachimg.jpg"
              alt="aws-s3-bucket-images"
            />
          </Banner>

          <Main>
            {filteredCoaches.map((coach) => (
              <Card
                description={coach.description}
                name={coach.name}
                image={coach.photo}
                age={coach.age}
                emails={coach.email}
                nums={coach.num}
              />
            ))}
          </Main>
        </Container>

        <br />
      </div>
    </div>
  );
}
const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 610px;
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
`;
const Container = styled.div`
  width: 100%;
  background-color: rgb(234, 237, 237);
  max-width: 1600px;
  border-radius: 15px;
  margin: auto;
  height: fit-content;
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;
  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;
  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }
  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
`;

const SearchBar = styled.div`
  input {
    padding: 10px;
    border-radius: 10px;
    border: none;
    color: rgb(0, 0, 0);
    border: 1px solid #d1d1d1;
    margin-bottom: 20px;
    width: 1000px;
    font-size: 16px;
  }
`;
export default TrainerAD;
