import React, { Component } from "react";
import ImageLightBox from "../common/Lightbox";

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.product.images.length > 0) {
      let lightboxImages = [];

      this.props.product.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages
      });
    }
  }

  handleLightBox = position => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: position
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = () =>
    this.state.lightboxImages.map(
      (item, i) =>
        i >= 0 ? (
          <div
            key={i}
            onClick={() => this.handleLightBox(i)}
            className="thumb shadow"
            style={{ background: `url(${item}) no-repeat` }}
          />
        ) : null
    );

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    }
  };

  render() {
    const { product } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            className="shadow pic"
            style={{
              background: `url(${this.renderCardImage(
                product.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}>
            {}
          </div>
        </div>
        <div className="main_thumbs">{this.showThumbs(product)}</div>
        {this.state.lightbox ? (
          <ImageLightBox
            id={product.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onclose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
