import React from "react";
import BannerBackground from "../../assets/images/home-banner-background.png";
import BannerImage from "../../assets/images/home-banner-image.png";
import { Link } from "react-router-dom";
import "./homepage.css";
import videoBg from "../../assets/videos/1.2.mp4";

const Home = () => {
  return (
    <div className="home-containerr">
      <video src={videoBg} autoPlay loop muted></video>
      <div className="contentt">
        <div className="home-container">
          <div className="home-banner-container">
            <div className="home-bannerImage-container">
              <img src={BannerBackground} alt="" />
            </div>
            <div className="home-text-section">
              <h1 className="primary-heading" style={{ color: "white" }}>
                FlexFitness Gyms
              </h1>
              <p className="primary-text" style={{ color: "white" }}>
                Welcome to our Flex Fitness Gym management system .
              </p>
              <div id="button-container">
                <div class="button-column">
                  <Link to="/shophome">
                    <button class="secondary-button green">Go Shopping</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
