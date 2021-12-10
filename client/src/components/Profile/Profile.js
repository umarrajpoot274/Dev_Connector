import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { getProfileById } from "../../action/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop.js";
import ProfileAbout from "./ProfileAbout";
import Experience from "./Experience";
import Education from "./Education";
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/dashboard" className="btn btn-dark">
            Back To Dashboard
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="text-primary">
              <h2>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <Experience key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience added yet</h4>
              )}
            </div>
            <div className="text-primary">
              <h2>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <Education key={education._id} education={education} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education added yet</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
