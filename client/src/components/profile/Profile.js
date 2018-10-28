import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvent } from "../../actions/eventActions";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  state = {
    event: {},
    loading: false
  };

  componentDidMount() {
    this.props.getEvent();
  }

  render() {
    return (
      <div className="row profile">
        <div className="col-lg-4 col-md-6 col-sm-12 profile-col">
          <Link className="prof-col prof-one text-dark shadow" to="/register">
            <h4>Lägg till Profil</h4>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 profile-col">
          <Link
            className="prof-col prof-two text-dark shadow"
            to="/product/new">
            <h4>Lägg till Produkt</h4>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 profile-col">
          <Link
            className="prof-col prof-three text-dark shadow"
            to={`/event/${this.props.event._id}`}>
            <h4>Utställningar</h4>
          </Link>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getEvent: PropTypes.func,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { getEvent }
)(withRouter(Profile));
