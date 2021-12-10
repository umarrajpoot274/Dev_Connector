import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = ({
  experience: { company, title, location, to, from, description },
}) => (
  <div class="profile-exp bg-white p-2">
    <h2 class="text-primary">Experience</h2>
    <div>
      <h3 class="text-dark">{company && company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        <Moment format="YYYY/MM/DD">{!to ? "Now" : to}</Moment>
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  </div>
);

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
