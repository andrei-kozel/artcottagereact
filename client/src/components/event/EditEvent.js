import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvent, editEvent } from "../../actions/eventActions";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      date: "",
      description: "",
      adress: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.event) {
      const event = nextProps.event;

      event.name = !isEmpty(event.name) ? event.name : "";
      event.date = !isEmpty(event.date) ? event.date : "";
      event.description = !isEmpty(event.description) ? event.description : "";
      event.adress = !isEmpty(event.adress) ? event.adress : "";

      this.setState({
        name: event.name,
        date: event.date,
        description: event.description,
        adress: event.adress
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const eventData = {
      name: this.state.name,
      adress: this.state.adress,
      date: this.state.date,
      description: this.state.description,
      errors: this.state.errors
    };

    this.props.editEvent(
      this.props.match.params.id,
      eventData,
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

  render() {
    const { errors } = this.state;

    return (
      <div className="product shadow col-lg-9 col-md-10 col-sm-12">
        <div className="relog-wrap ">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-12 add-form">
              <h2 className="text-dark">Ändra Utställning</h2>
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
                      label="Datum"
                      placeholder="Datum"
                      name="date"
                      value={this.state.date}
                      onChange={this.onChange}
                      error={errors.date}
                    />
                    <TextFieldGroup
                      label="Adress"
                      name="adress"
                      placeholder="Adress"
                      value={this.state.adress}
                      onChange={this.onChange}
                      error={errors.adress}
                    />
                    <TextAreaFieldGroup
                      name="description"
                      label="Beskrivning"
                      placeholder="Beskrivning"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
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

EditEvent.propTypes = {
  getEvent: PropTypes.func,
  editEvent: PropTypes.func,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { getEvent, editEvent }
)(withRouter(EditEvent));
