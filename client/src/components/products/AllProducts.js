import React, { Component } from "react";
import ProductFeed from "./ProductFeed";
import {
  showAllProducts,
  showPlates,
  showCandle,
  showDekor,
  showOther
} from "../../actions/productsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactLoading from "react-loading";

class AllProducts extends Component {
  state = {
    products: [],
    product: {},
    loading: false,
    currentPage: 1,
    todosPerPage: 3
  };

  componentDidMount = () => {
    this.props.showAllProducts();
  };

  showAll = () => {
    this.props.showAllProducts();
  };

  showPlates = () => {
    this.props.showPlates();
  };

  showCandle = () => {
    this.props.showCandle();
  };

  showDekor = () => {
    this.props.showDekor();
  };

  showOther = () => {
    this.props.showOther();
  };

  render() {
    const { products, loading } = this.props.products;

    let productsContent;
    if (products === null || loading) {
      productsContent = (
        <div className="loading-wrap">
          <ReactLoading className="loading" type="bubbles" color="#8dc63f" />
        </div>
      );
    } else {
      productsContent = <ProductFeed products={products} />;
    }

    return (
      <div className="product-container">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-12">
            <div className="filter-wrap">
              <button
                className="link-button link-button__green"
                onClick={this.showAll}>
                Alla
              </button>
              <button
                className="link-button link-button__green"
                onClick={this.showPlates}>
                Tallrikar
              </button>
              <button
                className="link-button link-button__green"
                onClick={this.showDekor}>
                Dekor
              </button>
              <button
                className="link-button link-button__green"
                onClick={this.showCandle}>
                Ljusstakar
              </button>
              <button
                className="link-button link-button__green"
                onClick={this.showOther}>
                Övrig
              </button>
            </div>
          </div>
          <div className="col-lg-10 col-md-8 col-sm-12">
            <div className="row">{productsContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

AllProducts.propTypes = {
  showAllProducts: PropTypes.func,
  showPlates: PropTypes.func,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { showAllProducts, showPlates, showCandle, showDekor, showOther }
)(withRouter(AllProducts));
