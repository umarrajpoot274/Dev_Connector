import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({
  education: { school, degree, fieldofstudy, to, from, description },
}) => (
  <div class="profile-exp bg-white p-2">
    <h2 class="text-primary">Education</h2>
    <div>
      <h3 class="text-dark">{school && school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        <Moment format="YYYY/MM/DD">{!to ? "Now" : to}</Moment>
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  </div>
);

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
