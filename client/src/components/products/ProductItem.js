import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="product-card shadow">
          <div className="product-front">
            <div className="shadow" />
            <img
              src={
                product.images.length >= 1
                  ? product.images[0].url
                  : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png"
              }
              alt=""
            />
            <div className="image_overlay" />
            <div className="link-container">
              <Link
                to={`/products/${product._id}`}
                className="view_details shadow link-button link-button__white">
                Visa mer
              </Link>
            </div>

            <div className="stats">
              <div className="stats-container">
                <span className="product_name">{product.title}</span>
                <span className="product_price">
                  {product.price ? product.price + " SEK" : null}
                </span>
                <p>{product.category}</p>

                <div className="product-options">
                  <strong>Storlek</strong>
                  <span>{product.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProductItem);
