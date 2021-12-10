import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./action/auth";
import { useEffect } from "react";
import Dashboard from "./components/dashbord/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/ProfileForm/CreateProfile";
import Edit_Profile from "./components/ProfileForm/Edit_Profile";
import AddExperience from "./components/ProfileForm/AddExperience";
import Add_Education from "./components/ProfileForm/Add_Education";
import Profiles from "./components/Profiles/Profiles";
import Admin__Login from "./components/auth/Admin__Login";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Post/Posts";
import Post from "./components/SinglePost/Post";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/admin-login" component={Admin__Login} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={Edit_Profile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={Add_Education}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
