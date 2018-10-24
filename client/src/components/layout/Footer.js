import React from "react";

export default function Footer() {
  return (
    <footer className="footer text-white-50 ">
      <div className="container ">
        <div className="row footer-details">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h4>Kontakter:</h4>
            <ul>
              <li>
                <i className="fas fa-phone" /> +46701465635
              </li>
              <li>
                <i className="fas fa-envelope" />
                vera.artcottage@gmail.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt" /> Ölmanäs Strandväg 36,
                439 52 Åsa, Sweden
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h4>Länkar:</h4>
            <ul className="links">
              <li>
                <a href="/">Hemma</a>
              </li>
              <li>
                <a href="/">Kontakta mig</a>
              </li>
              <li>
                <a href="/">Produkter</a>
              </li>
            </ul>
            <div className="row socials">
              <a href="/">
                <i className="fab fa-instagram" />
              </a>
              <a href="/">
                <i className="fab fa-facebook-square" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row footer-copyright">
        <div className="container">
          <div className="col-sm-12">© 2018 by Andrei Kozel</div>
        </div>
      </div>
    </footer>
  );
}
