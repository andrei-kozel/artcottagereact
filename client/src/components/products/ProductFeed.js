import React, { Component } from "react";
import ProductItem from "./ProductItem";

class ProductFeed extends Component {
  render() {
    const { products } = this.props;

    return products.map(product => (
      <ProductItem key={product._id} product={product} />
    ));
  }
}

export default ProductFeed;
