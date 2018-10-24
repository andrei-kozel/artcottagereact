import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactLoading from "react-loading";
import axios from "axios";

class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      uploadFiles: [],
      uploading: false
    };
  }

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data"
      }
    };
    formData.append("file", files[0]);

    axios
      .post("/api/products/uploadimage", formData, config)
      .then(res => {
        this.setState(
          {
            uploading: false,
            uploadFiles: [...this.state.uploadFiles, res.data]
          },
          () => {
            this.props.imagesHandler(this.state.uploadFiles);
          }
        );
      })
      .catch(err => console.log(err));
  };

  showUploadedImages = () =>
    this.state.uploadFiles.map(item => (
      <div className="dropzone_box" key={item.public_id}>
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}>
          <div className="wrap-delete">
            <i className="delete fas fa-minus-circle" />
          </div>
        </div>
      </div>
    ));

  render() {
    return (
      <div className="dropzone clear">
        <Dropzone
          onDrop={e => this.onDrop(e)}
          multiple={false}
          className="dropzone_box">
          <div className="wrap text-dark">
            <div className="rotate">
              <i className="fas fa-plus-circle" />
            </div>
          </div>
        </Dropzone>
        {this.showUploadedImages()}
        {this.state.uploading ? (
          <div className="dropzone_box">
            <ReactLoading className="loading" type="bubbles" color="#8dc63f" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUpload;
