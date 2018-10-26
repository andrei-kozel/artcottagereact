import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import FileUpload from "../products/FileUpload";

import { editProduct, getProduct } from "../../actions/productsActions";
import isEmpty from "../../validation/is-empty";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      category: "",
      technique: "",
      size: "",
      material: "",
      description: "",
      price: "",
      available: true,
      images: [],
      likes: [],
      comments: [],
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);

    this.setState({
      available: this.props.products.product.available,
      images: this.props.products.product.images
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        images: this.props.products.product.images
      });
    }

    if (nextProps.products.product) {
      const product = nextProps.products.product;

      product.title = !isEmpty(product.title) ? product.title : "";
      product.category = !isEmpty(product.category) ? product.category : "";
      product.technique = !isEmpty(product.technique) ? product.technique : "";
      product.size = !isEmpty(product.size) ? product.size : "";
      product.material = !isEmpty(product.material) ? product.material : "";
      product.description = !isEmpty(product.description)
        ? product.description
        : "";
      product.price = !isEmpty(product.price) ? product.price : 0;
      product.images = !isEmpty(product.images) ? product.images : [];

      this.setState({
        title: product.title,
        category: product.category,
        technique: product.technique,
        size: product.size,
        material: product.material,
        description: product.description,
        price: product.price,
        images: product.images
      });
    }
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  onSubmit = e => {
    e.preventDefault();
    let uniqueArray = this.state.images;
    uniqueArray = this.removeDuplicates(this.state.images, "public_id");

    const productData = {
      title: this.state.title,
      category: this.state.category,
      technique: this.state.technique,
      size: this.state.size,
      material: this.state.material,
      description: this.state.description,
      price: this.state.price,
      available: this.state.available,
      images: uniqueArray,
      likes: this.state.likes,
      comments: this.state.comments,
      errors: this.state.errors
    };

    this.props.editProduct(
      this.props.match.params.id,
      productData,
      this.props.history
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "available") {
      this.setState({
        available: !this.state.available
      });
    }
  };

  imagesHandler = images => {
    this.setState({
      images: images
    });
  };

  render() {
    const { errors } = this.state;
    const categories = [
      { label: "Välj kategori", value: 0 },
      { label: "Tallrik", value: "Tallrik" },
      { label: "Dekoration", value: "Dekoration" },
      { label: "Ljusstake", value: "Ljusstake" },
      { label: "Övrig", value: "Övrig" }
    ];

    return (
      <div className="product shadow col-lg-9 col-md-10 col-sm-12">
        <div className="relog-wrap ">
          <h2 className="text-dark">Ändra Produkt</h2>
          <FileUpload
            imagesHandler={images => {
              this.imagesHandler(images);
            }}
            images={this.props.products.product.images}
          />
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-12 add-form">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group ">
                  <div className="form-wrap">
                    <TextFieldGroup
                      label="Namn"
                      name="title"
                      placeholder="Produkt namn"
                      value={this.state.title}
                      onChange={this.onChange}
                      error={errors.title}
                    />
                    <SelectListGroup
                      label="Välj kategori"
                      placeholder="Välj kategori"
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange}
                      error={errors.category}
                      options={categories}
                    />
                    <TextFieldGroup
                      label="Teknik"
                      placeholder="Teknik"
                      name="technique"
                      value={this.state.technique}
                      onChange={this.onChange}
                      error={errors.technique}
                    />
                    <TextFieldGroup
                      label="Storlek"
                      name="size"
                      placeholder="Storlek"
                      value={this.state.size}
                      onChange={this.onChange}
                      error={errors.size}
                    />
                    <TextFieldGroup
                      label="Material"
                      placeholder="Material"
                      name="material"
                      value={this.state.material}
                      onChange={this.onChange}
                      error={errors.material}
                    />
                    <TextFieldGroup
                      label="Pris (endast siffror)"
                      placeholder="Pris"
                      name="price"
                      type="number"
                      value={this.state.price}
                      onChange={this.onChange}
                      error={errors.price}
                    />
                    <TextAreaFieldGroup
                      name="description"
                      label="Beskrivning"
                      placeholder="Beskrivning"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
                    <div className="form-check">
                      <input
                        defaultChecked={this.state.available}
                        name="available"
                        type="checkbox"
                        className="form-check-input"
                        value={this.state.available}
                        onChange={this.onChange}
                        error={errors.available}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1">
                        Inte tillgänglig (Slut i lager)
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-info">
                  Skapa
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProduct.propTypes = {
  errors: PropTypes.object,
  getProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProduct, getProduct }
)(withRouter(EditProduct));
