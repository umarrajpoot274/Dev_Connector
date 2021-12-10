import React from "react";
import { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../action/auth";
import setAlert from "../../action/alert";

const Login = ({ login, isAuthenticated, history }) => {
  const [formData, setFormData] = useState(
    {
      email: "",
      password: "",
    },
    []
  );
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value /**setting formDate.name = value in input field */,
    });
  const onSubmit = async (e) => {
    e.preventDefault();

    return login(email, password, history);
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Admin Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign In to Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="login" />
        </form>
      </section>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(withRouter(Login));
