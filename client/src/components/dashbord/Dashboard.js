import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { deleteAccount, getCurrentProfile } from "../../action/profile";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { Link } from "react-router-dom";
import { DashboardAction } from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user, isAuthenticated },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome{" "}
        {isAuthenticated ? user.name : <Fragment>Undefine user</Fragment>}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Fragment>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <br></br>
            <br></br>
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete Account
            </button>
            <Link
              to={`/profile/${profile.user._id}`}
              className="btn btn-primary"
            >
              {" "}
              View Profile
            </Link>
          </Fragment>
        </Fragment>
      ) : (
        <Fragment>
          You don't have any Profile yet. Create Your Profile first!<br></br>
          <Link to="create-profile" className="my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
