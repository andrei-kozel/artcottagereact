import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrenUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import AllProducts from "./components/products/AllProducts";
import Product from "./components/products/Product";

import CreateProduct from "./components/create-product/CreateProduct";
// style
import "./scss/main.scss";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrenUser(decoded));
  // check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/register" component={Register} />
              </Switch>
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/products/new"
                  component={CreateProduct}
                />
              </Switch>
              <Route exact path="/products" component={AllProducts} />
              <Route exact path="/products/:id" component={Product} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
