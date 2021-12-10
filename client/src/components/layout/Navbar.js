import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../action/auth";
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
        {"   "}
        <Link to="/" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
        {"   "}
        <Link to="/posts">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Post</span>
        </Link>
      </li>
    </ul>
  );
  const adminLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
        {"   "}
        <Link to="/" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
        {"  "}
        <Link to="/profiles">
          <i className="fas fa-user" /> <span className="hide-sm">Users</span>
        </Link>
        <Link to="/posts">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Post</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          {" "}
          {isAuthenticated && user._id === "619f5fd8953c8a3924149966" ? (
            adminLinks
          ) : (
            <div>{isAuthenticated ? authLinks : guestLinks}</div>
          )}
        </Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
