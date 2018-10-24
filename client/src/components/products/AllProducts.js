import React, { Component } from "react";
import ProductFeed from "./ProductFeed";
import { showAllProducts } from "../../actions/productsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactLoading from "react-loading";

class AllProducts extends Component {
  state = {
    products: [],
    product: {},
    loading: false
  };

  componentDidMount = () => {
    this.props.showAllProducts();
  };

  render() {
    const { products, loading } = this.props.products;

    let productsContent;
    if (products === null || loading) {
      productsContent = (
        <ReactLoading className="loading" type="bubbles" color="#8dc63f" />
      );
    } else {
      productsContent = <ProductFeed products={products} />;
    }

    return (
      <div className="product-container">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-12">Filter</div>
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
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { showAllProducts }
)(withRouter(AllProducts));
