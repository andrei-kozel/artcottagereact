import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { showAllProducts } from "../../actions/productsActions";
import ProductItem from "../../components/products/ProductItem.js";

class LastAddedProducts extends Component {
  state = {
    products: [],
    product: {},
    loading: false
  };

  componentDidMount = () => {
    this.props.showAllProducts();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products.products
    });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="container">
        <div className="last-product-wrap">
          <div className="row">
            <div className="text-header">
              <h1>Produkter</h1>
            </div>
          </div>
          <div className="row">
            {products.slice(0, 3).map(prod => (
              <ProductItem key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

LastAddedProducts.propTypes = {
  showAllProducts: PropTypes.func,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { showAllProducts }
)(LastAddedProducts);
