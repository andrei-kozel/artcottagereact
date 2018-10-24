import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register col-lg-6 col-md-9 col-sm-10">
        <form noValidate className="relog-wrap shadow" onSubmit={this.onSubmit}>
          <div className="form-group ">
            <h2 className="text-dark">Logga In!</h2>
            <div className="form-wrap">
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
            </div>
          </div>

          <button type="submit" className="btn btn-info">
            Logga In
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  auth: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
