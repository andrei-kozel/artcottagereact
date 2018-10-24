import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      errors: this.state.errors
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register col-lg-6 col-md-9 col-sm-10">
        <form noValidate className="relog-wrap shadow" onSubmit={this.onSubmit}>
          <div className="form-group">
            <h2 className="text-dark">Skapa ett konto!</h2>
            <div className="form-wrap">
              <TextFieldGroup
                label="Namn"
                placeholder="Namn"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                label="Lösenord"
                placeholder="Lösenord"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                label="Verifiera lösenord"
                placeholder="Verifiera lösenord"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-info">
            Skapa
          </button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func,
  auth: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
