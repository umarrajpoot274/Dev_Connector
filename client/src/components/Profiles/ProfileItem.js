import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    company,
    status,
    skills,
    location,
  },
}) => {
  return (
    <Fragment>
      <div className="profiles bg-light" style={{ display: "flex" }}>
        <img
          src={avatar}
          style={{
            borderRadius: "50%",
            width: "200px",
            height: "200px",
            margin: "10px",
          }}
        />
        <div style={{ marginLeft: "100px", marginTop: "10px" }}>
          <h2>{name}</h2>
          <p>
            <div>userId: {_id}</div>
          </p>
          <p>
            {status} {company && <span>at {company}</span>}
          </p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            {" "}
            View Profile
          </Link>
          <ul>
            <div>Skills: {skills}</div>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
