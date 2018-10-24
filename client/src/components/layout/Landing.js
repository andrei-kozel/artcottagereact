import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      {/* CAROUSEL */}
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/img/1.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="/img/2.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/img/3.jpg" alt="Third slide" />
          </div>
        </div>
      </div>

      {/* MAIN BLOCKS */}
      <div className="features">
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 first">
              <div className="circle">
                <i className="fas fa-history " />
              </div>
              <h4>History</h4>
              <h5>Om mig</h5>
              <p>
                Jag är född och uppvuxen i Ryssland men bosatt i Sverige sedan
                25 år tillbaka...
              </p>
              <div className="circle-b">
                <a href="/" className="link-button link-button__green">
                  Läsa mer
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 second">
              <div className="circle">
                <i className="fas fa-book-open" />
              </div>
              <h4>Produkter</h4>
              <h5>Mina produkter</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti, molestias.
              </p>
              <div className="circle-b">
                <Link
                  to="/products"
                  className="link-button link-button__orange">
                  Läsa mer
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 third">
              <div className="circle">
                <i className="fab fa-envira" />
              </div>
              <h4>Material</h4>
              <h5>Lorem, ipsum.</h5>
              <p>
                Jag är född och uppvuxen i Ryssland men bosatt i Sverige sedan
                25 år tillbaka...
              </p>
              <div className="circle-b">
                <a href="/" className="link-button link-button__blue">
                  Läsa mer
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 fourth">
              <div className="circle">
                <i className="fas fa-newspaper" />
              </div>
              <h4>Nyheter</h4>
              <h5>Lorem, ipsum.</h5>
              <p>
                Jag är född och uppvuxen i Ryssland men bosatt i Sverige sedan
                25 år tillbaka...
              </p>
              <div className="circle-b">
                <a href="/" className="link-button link-button__yellow">
                  Läsa mer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2152.031899217153!2d12.0761752159935!3d57.35849428101312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464fdc954f50f0d3%3A0x7d6ee1896c3da78!2sG%C3%A5rda+Brygga+Strandv%C3%A4g+36%2C+439+52+%C3%85sa!5e0!3m2!1sru!2sse!4v1536952367739"
        width="100%"
        height="450px"
        frameBorder="0"
        allowFullScreen
        title="This is my location"
        alt="my location"
      />
    </div>
  );
}
