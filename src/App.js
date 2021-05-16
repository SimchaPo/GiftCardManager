import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from "./components/navbar.component.js";
import UsersList from "./components/users-list.component.js";
import CreateGiftCard from "./components/create-gift-card.component.js";
import CreateUser from "./components/create-new-user.component.js";
import EditUser from "./components/edit-user.component.js";
import SignIn from "./components/sign-in.component.js";
import Footer from "./components/footer.component.js";
import LogIn from "./components/log-in.component.js";
import Logout from "./components/logout.component.js";
import OrderCard from "./components/order-new-card.component.js";
import CreateNewStore from "./components/create-new-store.component.js";
import About from "./components/about.component.js";
import Catalog from "./components/catalog.component.js";
import { LoggedinRoute } from "./protectedRoutes/loggedinRoute.js";
import { NotLoggedinRoute } from "./protectedRoutes/notLoggedinRoute.js";
import { AdminRoute } from "./protectedRoutes/adminRoute.js";
import PageNotFound from "./components/404-page.js";
import Auth from "./authentication/auth.js";

function App() {
  const { user, login, logout, isAuthenticated } = Auth();
  console.log("loggedIn", user);
  return (
    <Router>
      <div className="container">
        <Navbar {...{ isAuthenticated, user }} />
        <br />
        <Switch>
          <Route path="/" exact component={UsersList} />
          <NotLoggedinRoute path="/signIn" component={SignIn} />
          <NotLoggedinRoute
            path="/logIn"
            {...{ login, isAuthenticated }}
            component={LogIn}
          />
          <LoggedinRoute
            path="/logout"
            {...{ logout, isAuthenticated }}
            component={Logout}
          />
          <AdminRoute path="/createGC" component={CreateGiftCard} />
          <Route path="/about" component={About} />
          <Route path="/edit/:id" component={EditUser} />
          <Route path="/orderCard" component={OrderCard} />
          <AdminRoute path="/createStore" component={CreateNewStore} />
          <Route path="/catalog" component={() => <Catalog {...{ user }} />} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
