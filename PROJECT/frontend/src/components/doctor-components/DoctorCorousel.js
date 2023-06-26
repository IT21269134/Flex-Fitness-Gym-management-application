import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function DoctorCarousel() {
  useEffect(() => {
    // Initialize the carousel after the component mounts
    const carousel = document.querySelector("#doctorCarousel");
    const bsCarousel = new window.bootstrap.Carousel(carousel, {
      interval: 10000,
      pause: "hover",
      keyboard: true,
    });

    // Stop the carousel from autoplaying when the user interacts with it
    carousel.addEventListener("slide.bs.carousel", () => {
      bsCarousel.pause();
    });

    // Restart the carousel after the user finishes interacting with it
    carousel.addEventListener("slid.bs.carousel", () => {
      bsCarousel.cycle();
    });
  }, []);

  return (
    <div id="doctorCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#doctorCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#doctorCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#doctorCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://www.pharma-smart.com/hubfs/Health%20%26%20Fitness%20Banner-May-19-2022-06-36-58-53-PM.jpg"
            className="d-block w-100"
            alt="pic1"
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
        <div className="carousel-item">
          <img
            src="https://i.ytimg.com/vi/IOU0-Bpb63Y/maxresdefault.jpg"
            className="d-block w-100"
            alt="pic2"
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
        <div className="carousel-item">
          <img
            src="https://cdcssl.ibsrv.net/ibimg/smb/1300x640_80/webmgr/1v/v/c/Diana/63878ec5176db_banner.jpg"
            className="d-block w-100"
            alt="pic3"
          />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#doctorCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#doctorCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      <style jsx>{`
        /* DoctorCarousel.module.css */

        /* Animate the carousel items */
        .carousel-item {
          transition: transform 0.5s ease-in-out;
        }
        .carousel-item.active {
          transform: scale(1.1);
        }

        /* Add text overlays */
        .carousel-caption {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
        }
        .carousel-caption h5 {
          font-size: 2rem;
          color: #fff;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }
        .carousel-caption p {
          font-size: 1.5rem;
          color: #fff;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }

        /* Use custom navigation buttons */
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-image: none;
        }
        .carousel-control-prev-icon:before {
          font-size: 3rem;
          color: #fff;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }
        .carousel-control-next-icon:before {
          font-size: 3rem;
          color: #fff;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }

        /* Add parallax effect */
        .carousel-inner {
          perspective: 1000px;
        }
        .carousel-item img {
          transform: translateZ(-100px);
        }
        .carousel-item.active img {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}

export default DoctorCarousel;
