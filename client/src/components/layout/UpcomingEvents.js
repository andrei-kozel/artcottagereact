import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvent } from "../../actions/eventActions";
import { withRouter } from "react-router-dom";

class UpcomingEvents extends Component {
  componentDidMount() {
    this.props.getEvent();
  }

  render() {
    const { event } = this.props;

    return (
      <div className="upcoming_events_wrap">
        <div className="upcoming_events_wrap--header">
          <h1>Utställningar</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="upcoming_events_wrap--img shadow" />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="upcoming_events_wrap--details text-dark">
                <h5>
                  <strong>{event.name}</strong>
                </h5>
                <p>{event.description}</p>
                <h5>
                  <strong>När:</strong> {event.date}
                </h5>
                <h5>
                  <strong>Plats:</strong> {event.adress}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpcomingEvents.propTypes = {
  getEvent: PropTypes.func,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { getEvent }
)(withRouter(UpcomingEvents));
