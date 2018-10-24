import React, { Component } from "react";
import { getProduct } from "../../actions/productsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "./Card";
import ReactLoading from "react-loading";

class Product extends Component {
  componentDidMount = () => {
    this.props.getProduct(this.props.match.params.id);
  };

  render() {
    const { product, loading } = this.props;
    let productContent;
    if (
      this.props.product === null ||
      loading ||
      Object.keys(product).length === 0
    ) {
      productContent = (
        <ReactLoading className="loading" type="bubbles" color="#8dc63f" />
      );
    } else {
      productContent = <Card product={product} />;
    }
    return <div>{productContent}</div>;
  }
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object,
  auth: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  product: state.products.product,
  loading: state.products.loading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProduct }
)(Product);
