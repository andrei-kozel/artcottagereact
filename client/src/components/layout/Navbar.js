import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-right navbar-nav nav">
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            <i
              className={classnames("fas fa-user", {
                "color-green": isAuthenticated
              })}
            />{" "}
            Profil
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={this.onLogoutClick}>
            <i
              className={classnames("fas fa-sign-out-alt", {
                "color-red": isAuthenticated
              })}
            />
            {"  "}
            Logga Ut
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-right navbar-nav nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <i className="fas fa-user" /> Logga In
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
          <div className="container">
            <a className="navbar-brand" href="/">
              <span className="green">Art</span>
              <span className="orange">Cottage</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Hemma
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Kontakt
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Produkter
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
