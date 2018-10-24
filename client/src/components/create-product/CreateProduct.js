import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import FileUpload from "../products/FileUpload";

import { createProduct } from "../../actions/productsActions";

class CreateProduct extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const productData = {
      title: this.state.title,
      category: this.state.category,
      technique: this.state.technique,
      size: this.state.size,
      material: this.state.material,
      description: this.state.description,
      price: this.state.price,
      available: this.state.available,
      images: this.state.images,
      likes: this.state.likes,
      comments: this.state.comments,
      errors: this.state.errors
    };

    this.props.createProduct(productData, this.props.history);
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
    let imgArr = this.state.images;
    imgArr = imgArr.concat(images);
    this.setState({
      images: imgArr
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
          <h2 className="text-dark">Lägg till Produkt</h2>
          <FileUpload
            imagesHandler={images => {
              this.imagesHandler(images);
            }}
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

CreateProduct.propTypes = {
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProduct }
)(withRouter(CreateProduct));
