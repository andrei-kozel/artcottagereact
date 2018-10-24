import { connect } from "react-redux";
import ProdImg from "./ProdImg";

import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="row ">
        <div className="col-lg-7 col-md-6 col-sm-12 product_image">
          <ProdImg product={this.props.product} />
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <div className="product-description">
            <h1>{this.props.product.title}</h1>
            <strong>Mått:</strong> {this.props.product.size}
            <strong>Teknik:</strong> {this.props.product.size}
            <strong>Material:</strong> {this.props.product.size}
            <strong>Tillgänlighet:</strong> {this.props.product.size}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Card);
