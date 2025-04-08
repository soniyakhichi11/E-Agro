import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const Home = () => {
  return (
    <>
      <main>
        {/* Bootstrap Carousel */}
        <div id="carouselExampleCaptions" className="carousel slide carousel-fade">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/carousel1.jpg" className="d-block w-100 img-fluid" alt="Agriculture" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Welcome to E-Agro</h2>
                <p>Best Online Platform For Farmers</p>
                <button className="btn btn-primary">Technology</button>
                <button className="btn btn-danger">Development</button>
                <button className="btn btn-warning">Advancement</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/carousel2.jpg" className="d-block w-100 img-fluid" alt="Agriculture" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Welcome to E-Agro</h2>
                <p>Best Online Platform For Farmers</p>
                <button className="btn btn-primary">Technology</button>
                <button className="btn btn-danger">Development</button>
                <button className="btn btn-warning">Advancement</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/carousel3.jpg" className="d-block w-100 img-fluid" alt="Agriculture" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Welcome to E-Agro</h2>
                <p>Best Online Platform For Farmers</p>
                <button className="btn btn-primary">Technology</button>
                <button className="btn btn-danger">Development</button>
                <button className="btn btn-warning">Advancement</button>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Rental Services Section */}
        <div className="container my-4  lion lion2 ">
          <div className="row featurette tiger">
            <div className="col-md-7">
              <h2 className="featurette-heading">Rental Services</h2>
              <p className="lead">
                At E-Agro, we offer affordable rentals of top-quality farming tools and machinery, including tractors, harvesters, and irrigation systems.
                Enjoy flexible rental terms and exceptional support to enhance your farming efficiency. Additionally, you can list your own tools for rent,
                connecting with local farmers and turning your equipment into extra income. Rent with E-Agro and cultivate success.
              </p>
            </div>
            <div className="col-md-5">
            <img src="/images/Rentaldetail.jpg" className="custom-img" alt="Tractor" />
            </div>
          </div>
        </div>

        {/* Crop Information Section */}
        <div className="container my-4 lion lion2">
          <div className="row featurette tiger">
            <div className="col-md-7">
              <h2 className="featurette-heading">Detailed Crop Information</h2>
              <p className="lead">
                Explore comprehensive information on a wide variety of crops at E-Agro. Our detailed guides cover everything you need to know, from soil
                suitability and planting techniques to optimal fertilizer use and irrigation schedules.
              </p>
            </div>
            <div className="col-md-5">
            <img src="/images/cropdetail.jpg" className="custom-img" alt="Crop" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
