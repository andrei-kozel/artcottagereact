import { connect } from "react-redux";
import ProdImg from "./ProdImg";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../actions/productsActions";
import PropTypes from "prop-types";

class Card extends Component {
  onDeleteClick(id) {
    this.props.deleteProduct(id);
    this.history.push(null, "/products");
  }
  render() {
    const { product } = this.props;
    return (
      <div className="row product-wrap">
        <div className="product-wrap" />
        <div className="col-lg-7 col-md-6 col-sm-12 product_image">
          <ProdImg product={this.props.product} />
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <div className="product-description">
            <div className="product_header">
              <h1>{this.props.product.title}</h1>

              {this.props.auth.isAuthenticated ? (
                <div>
                  <span className="text-secondary">
                    <Link
                      to="/products"
                      onClick={this.onDeleteClick.bind(this, product._id)}>
                      <i className="fas fa-trash-alt" />
                    </Link>
                  </span>
                  <span className="text-secondary">
                    <Link to="/">
                      <i className="fas fa-edit" />
                    </Link>
                  </span>
                </div>
              ) : null}
            </div>

            {this.props.product.available ? (
              <div className="alert alert-success" role="alert">
                <i className="fas fa-check" /> Finns i butik
              </div>
            ) : (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-times" /> Inte tillgänglig. Förbeställning
                endast
              </div>
            )}
            <h3 id="details">Detaljer:</h3>
            <div className="desc_items">
              <div className="desc_item">
                <strong>Mått:</strong> {this.props.product.size}
              </div>
              <div className="desc_item">
                <strong>Teknik:</strong> {this.props.product.technique}
              </div>
              <div className="desc_item">
                <strong>Material:</strong> {this.props.product.material}
              </div>
              <div className="desc_item">
                <strong>Beskrivning:</strong> {this.props.product.description}
              </div>
            </div>

            <Link to="/contacts" className="link-button link-button__green">
              Beställa
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProduct }
)(Card);
