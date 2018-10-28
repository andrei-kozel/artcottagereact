import React, { Component } from "react";
import axios from "axios";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Captcha from "react-captcha";

class Contacts extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      msg: "",
      phone: "",
      success: false,
      isVerified: false,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "available") {
      this.setState({
        available: !this.state.available
      });
    }
  };

  verifyCaptcha = res => {
    if (res) {
      this.setState({
        isVerified: true
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const msgData = {
      name: this.state.name,
      email: this.state.email,
      msg: this.state.msg,
      phone: this.state.phone,
      description: this.state.description,
      errors: this.state.errors
    };

    axios.post("/contact", msgData).then(res =>
      this.setState({
        success: res.data.success
      })
    );
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="contact-wrap">
              <div className="contact-wrap--header">
                <h1>Kontakta mig!</h1>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="contact-wrap--details text-black">
                    <p>
                      Hör av dig om du har några frågor om allting som har med
                      Vera Art Cottage att göra.
                    </p>
                    <p>Så kommer jag svara så fort jag kan!</p>
                    <ul>
                      <li>
                        <i className="fas fa-phone" /> +46701465635
                      </li>
                      <li>
                        <i className="fas fa-envelope" />
                        vera.artcottage@gmail.com
                      </li>
                      <li>
                        <i className="fas fa-map-marker-alt" /> Ölmanäs
                        Strandväg 36, 439 52 Åsa, Sweden
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 contact-wrap--form shadow">
                  <div className="relog-wrap">
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="form-group ">
                        <div className="form-wrap">
                          <TextFieldGroup
                            label="Namn"
                            name="name"
                            placeholder="namn"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                          />
                          <TextFieldGroup
                            label="Email"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                          />
                          <TextFieldGroup
                            label="Tel. nummer"
                            name="phone"
                            placeholder="Tel. nummer"
                            value={this.state.phone}
                            onChange={this.onChange}
                            error={errors.phone}
                          />
                          <TextAreaFieldGroup
                            name="msg"
                            label="Medelande"
                            placeholder="Medelande"
                            value={this.state.msg}
                            onChange={this.onChange}
                            error={errors.msg}
                          />
                        </div>
                      </div>
                      <div className="captcha">
                        <Captcha
                          sitekey="6Le_NXcUAAAAADXsOkh_XVn6wi8ZU7NDB8kasJYv"
                          lang="sv"
                          theme="light"
                          type="image"
                          callback={this.verifyCaptcha}
                        />
                      </div>

                      {this.state.success === true ? (
                        <div className="alert alert-success" role="alert">
                          Skickat!
                        </div>
                      ) : null}
                      {this.state.isVerified ? (
                        <button type="submit" className="btn btn-info">
                          Skicka
                        </button>
                      ) : null}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2152.031899217153!2d12.0761752159935!3d57.35849428101312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464fdc954f50f0d3%3A0x7d6ee1896c3da78!2sG%C3%A5rda+Brygga+Strandv%C3%A4g+36%2C+439+52+%C3%85sa!5e0!3m2!1sru!2sse!4v1536952367739"
            width="100%"
            height="450px"
            frameBorder="0"
            allowFullScreen
            title="This is my location"
            alt="my location"
          />
        </div>
      </div>
    );
  }
}

export default Contacts;
